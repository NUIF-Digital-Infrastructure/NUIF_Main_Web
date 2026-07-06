const APPLY_LIMIT = 3;
const APPLY_WINDOW_MS = 15 * 60 * 1000;
const APPLY_WINDOW_SECONDS = Math.ceil(APPLY_WINDOW_MS / 1000);

type CounterRecord = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
  resetAt: number;
};

const memoryStore = new Map<string, CounterRecord>();

function getKvConfig() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return null;
  }

  return { url, token };
}

async function kvRequest(path: string): Promise<number> {
  const config = getKvConfig();
  if (!config) {
    throw new Error('KV config is missing');
  }

  const response = await fetch(`${config.url}/${path}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${config.token}`
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`KV request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as { result?: number };
  if (typeof payload.result !== 'number') {
    throw new Error('Invalid KV response payload');
  }

  return payload.result;
}

async function checkLimitWithKv(key: string): Promise<RateLimitResult> {
  const encodedKey = encodeURIComponent(key);
  const count = await kvRequest(`incr/${encodedKey}`);

  if (count === 1) {
    await kvRequest(`expire/${encodedKey}/${APPLY_WINDOW_SECONDS}`);
  }

  const ttlSecondsRaw = await kvRequest(`ttl/${encodedKey}`);
  const ttlSeconds = ttlSecondsRaw > 0 ? ttlSecondsRaw : APPLY_WINDOW_SECONDS;
  const retryAfterSeconds = count > APPLY_LIMIT ? ttlSeconds : 0;
  const resetAt = Date.now() + ttlSeconds * 1000;

  return {
    allowed: count <= APPLY_LIMIT,
    limit: APPLY_LIMIT,
    remaining: Math.max(0, APPLY_LIMIT - count),
    retryAfterSeconds,
    resetAt
  };
}

function checkLimitInMemory(key: string): RateLimitResult {
  const now = Date.now();
  const current = memoryStore.get(key);

  if (!current || now >= current.resetAt) {
    const resetAt = now + APPLY_WINDOW_MS;
    memoryStore.set(key, { count: 1, resetAt });

    return {
      allowed: true,
      limit: APPLY_LIMIT,
      remaining: APPLY_LIMIT - 1,
      retryAfterSeconds: 0,
      resetAt
    };
  }

  const nextCount = current.count + 1;
  memoryStore.set(key, { count: nextCount, resetAt: current.resetAt });

  const retryAfterSeconds = nextCount > APPLY_LIMIT ? Math.ceil((current.resetAt - now) / 1000) : 0;

  return {
    allowed: nextCount <= APPLY_LIMIT,
    limit: APPLY_LIMIT,
    remaining: Math.max(0, APPLY_LIMIT - nextCount),
    retryAfterSeconds,
    resetAt: current.resetAt
  };
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

export async function checkApplyRateLimit(clientIp: string): Promise<RateLimitResult> {
  const key = `apply:${clientIp}`;

  if (getKvConfig()) {
    try {
      return await checkLimitWithKv(key);
    } catch (error) {
      console.error('KV rate limit failed, falling back to memory store:', error);
    }
  }

  return checkLimitInMemory(key);
}

export function buildRateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    'RateLimit-Limit': String(result.limit),
    'RateLimit-Remaining': String(result.remaining),
    'RateLimit-Reset': String(Math.max(0, Math.ceil((result.resetAt - Date.now()) / 1000))),
    'Retry-After': String(result.retryAfterSeconds)
  };
}
