const apiKey = "CG-yzmG7t2DmB7Em5x9MCVsTDiB" //API KEY
const coinAndPrice = document.getElementById('CoinAndPrice');
const coinForm = document.getElementById('CoinForm');

coinForm.addEventListener('submit', function (e) {
  e.preventDefault();
  GetCoinPrice();
})


//Fetching a certain coin with user input
function GetCoinPrice() {
  const selectedCoin = document.querySelector('input[name="CoinType"]:checked');
  if (!selectedCoin) {
    coinAndPrice.innerHTML = "Please select a coin";
    return;
  }

  const name = selectedCoin.value;
  console.log(name)
  const urlCoinSearch = `https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=usd`;
  console.log(urlCoinSearch)
  const optionsCoinSearch = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': apiKey
    }
  };

  fetch(urlCoinSearch, optionsCoinSearch)
    .then(res => res.json())
    .then(res => {
      const coinName = Object.keys(res)[0];
      const price = res[coinName].usd;
      coinAndPrice.innerHTML = `The ${coinName} price = $${price}`;
    });
}