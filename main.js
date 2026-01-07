function calculateCoin() {
  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('from-currency').value;
  const toCurrency = document.getElementById('to-currency').value;
  const resultElement = document.getElementById('result');

  if (!amount) {
    resultElement.textContent = 'Miqdor kiriting!';
    return;
  }

  const rates = {
    btc: { usd: 50000, eur: 45000, eth: 15 },
    eth: { usd: 3000, eur: 2700, btc: 0.06 },
    usdt: { usd: 1, eur: 0.9, btc: 0.00002 }
  };

  let rate = 1; 
  if (fromCurrency !== toCurrency) {
    rate = rates[fromCurrency]?.[toCurrency] || 0;
    if (rate === 0) {
      resultElement.textContent = 'Kurs topilmadi!';
      return;
    }
  }

  const result = amount * rate;
  resultElement.textContent = `${amount} ${fromCurrency.toUpperCase()} = ${result} ${toCurrency.toUpperCase()}`;
}

async function getRate(from, to) {
  const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`);
  const data = await response.json();
  return data[from][to];
}
