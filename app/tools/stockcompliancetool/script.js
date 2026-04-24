const RESTRICTED_SECTORS = [
  "Advanced Materials","Advanced Robotics","Artificial Intelligence","Civil Nuclear",
  "Communications","Computing Hardware","Critical Suppliers to Government","Cryptographic Authentication",
  "Data Infrastructure","Defence","Energy","Military and Dual-Use","Quantum Technologies",
  "Satellite and Space Technologies","Suppliers to the Emergency Services","Synthetic Biology","Transport"
];

const STOCKS = {
  AAPL: { name:"Apple Inc.",             sector:"Technology",       info:"Market Cap: $3.2T | Consumer Electronics", revenuePercent: 0 },
  RTX:  { name:"Raytheon Technologies",  sector:"Defence",          info:"Defense & Aerospace",                      revenuePercent: 95 },
  BAC:  { name:"Bank of America",        sector:"Finance",          info:"Banking Services",                         revenuePercent: 0 },
  PM:   { name:"Philip Morris",          sector:"Consumer Staples", info:"Tobacco",                                  revenuePercent: 0 },
  MSFT: { name:"Microsoft",              sector:"Defence",          info:"Cloud + 8% defence exposure",              revenuePercent: 8 },
};

let stock = null, step = 0;

function showResult(msg, type) {
  const r = document.getElementById('result-box');
  r.style.display = 'block'; r.className = 'result ' + type; r.textContent = msg;
  document.getElementById('step-box').style.display = 'none';
}
function showStep(label, question) {
  document.getElementById('step-box').style.display = 'block';
  document.getElementById('step-label').textContent = label;
  document.getElementById('step-question').textContent = question;
  document.getElementById('result-box').style.display = 'none';
}
function reset() {
  document.getElementById('result-box').style.display = 'none';
  document.getElementById('step-box').style.display = 'none';
  document.getElementById('stock-card').style.display = 'none';
}

function startCheck() {
  const ticker = document.getElementById('ticker').value.trim().toUpperCase();
  reset(); stock = STOCKS[ticker];
  if (!stock) { showResult('Stock not found. Try: AAPL, RTX, MSFT, BAC, PM', 'info'); return; }
  document.getElementById('stock-card').style.display = 'block';
  document.getElementById('s-name').textContent = stock.name;
  document.getElementById('s-info').textContent = stock.info;
  document.getElementById('s-sector').textContent = 'Sector: ' + stock.sector;

  if (!RESTRICTED_SECTORS.includes(stock.sector)) {
    showResult('Step 1 PASS — Not in a restricted sector → INVEST', 'invest');
    step = 0;
  } else if (stock.revenuePercent >= 10) {
    showResult(`Step 2 FAIL — ${stock.revenuePercent}% revenue in restricted sector (≥ 10%) → REJECT`, 'reject');
    step = 0;
  } else {
    step = 3;
    showStep('Step 3 of 7', `Revenue in restricted sector is ${stock.revenuePercent}% (passes < 10% threshold). Does this investment meet the fund's sustainability goals?`);
  }
}

function handleYes() {
  if (step === 3) { step = 4; showStep('Step 4 of 7', 'Are there any ESG red flags associated with this investment?'); }
  else if (step === 4) { step = 5; showStep('Step 5 of 7', 'Does the company pass the 10% exclusion threshold for the flagged ESG activity?'); }
  else if (step === 5) { showResult('Step 5 FAIL — Does not pass exclusion threshold → REJECT', 'reject'); step = 0; }
  else if (step === 6) { step = 7; showStep('Step 7 of 7', 'Has the identified unethical behaviour been corrected or remediated?'); }
  else if (step === 7) { showResult('Step 7 PASS — Issue corrected → INVEST', 'invest'); step = 0; }
}

function handleNo() {
  if (step === 3) { showResult('Step 3 FAIL — Does not meet sustainability goals → REJECT', 'reject'); step = 0; }
  else if (step === 4) { step = 6; showStep('Step 6 of 7', 'Is there any substantiated evidence of unethical behaviour?'); }
  else if (step === 5) { step = 6; showStep('Step 6 of 7', 'Is there any substantiated evidence of unethical behaviour?'); }
  else if (step === 6) { showResult('Step 6 PASS — No unethical behaviour found → INVEST', 'invest'); step = 0; }
  else if (step === 7) { showResult('Step 7 FAIL — Issue not corrected → REJECT', 'reject'); step = 0; }
}
