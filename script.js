
async function fetchData() {
  const url = 'https://api.mexc.com/api/v3/ticker/price';
  try {
    const res = await fetch(url);
    const data = await res.json();
    document.getElementById('status').innerText = 'Data fetched successfully.';
    generateSignal(data);
  } catch (err) {
    document.getElementById('status').innerText = 'Error fetching data.';
  }
}

function generateSignal(data) {
  const topCoins = data.slice(0, 5);
  let signals = '';
  topCoins.forEach((coin) => {
    const price = parseFloat(coin.price);
    const tp = (price * 1.03).toFixed(4);
    const sl = (price * 0.97).toFixed(4);
    signals += `
      <div style="margin-bottom: 1rem;">
        <strong>${coin.symbol}</strong><br/>
        Buy at: ${price}<br/>
        TP: ${tp}<br/>
        SL: ${sl}
      </div>
    `;
  });
  document.getElementById('signal').innerHTML = signals;
}

fetchData();
setInterval(fetchData, 10 * 60 * 1000);
