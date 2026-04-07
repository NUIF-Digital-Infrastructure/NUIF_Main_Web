const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char]);
}

export function escapeHtmlWithLineBreaks(value: string): string {
  return escapeHtml(value).replace(/\r\n|\r|\n/g, '<br>');
}
