const { Console } = require("console")
const apiKey = process.env.NEXT_PUBLIC_API_KEY

//Ping site -> Response = { gecko_says: '(V3) To the Moon!' }
const urlPing = 'https://api.coingecko.com/api/v3/ping';
const optionsPing = {method: 'GET', headers: {accept: 'application/json'}};
fetch(urlPing, optionsPing)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));


//Ethereum Endpoint
const urlCoin = 'https://api.coingecko.com/api/v3/simple/price?ids=Ethereum&vs_currencies=usd';
const optionsCoin = {
method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': apiKey}
  };
  fetch(urlCoin, optionsCoin)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));


// Usable currencies
const urlAllCurrenciesShort = 'https://api.coingecko.com/api/v3/simple/supported_vs_currencies';
const optionsAllCurrenciesShort = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-cg-demo-api-key': apiKey}
};
fetch(urlAllCurrenciesShort, optionsAllCurrenciesShort)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));


//Fetching a certain coin with user input
process.stdout.write('What coin would you like the price of? (example Ethereum, Bitcoin) -> ');
process.stdin.on('data', (data) => {
    const name = data.toString().trim().toLocaleLowerCase();
    console.log(`Chosen coin is, ${name}!`);

    const urlCoinSearch = `https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=usd`;
    //console.log(url4)
    const optionsCoinSearch = {
        method: 'GET',
        headers: {
            accept: 'application/json', 
            'x-cg-demo-api-key': apiKey
        }
    };

    fetch(urlCoinSearch, optionsCoinSearch)
    .then(res => res.json())
    .then(json => {
        const price = json[name]?.usd;
        if (price) {
            console.log(`The ${name} price = $${price}`);
        } else {
            console.log('Could not find price for this coin. Make sure you use the correct coin ID.');
        }
        process.exit();
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit();
    });
  });


