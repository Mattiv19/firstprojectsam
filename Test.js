const { Console } = require("console")

const apiKey = process.env.NEXT_PUBLIC_API_KEY

/*
//Ping site -> Response = { gecko_says: '(V3) To the Moon!' }
const url = 'https://api.coingecko.com/api/v3/ping';
const options = {method: 'GET', headers: {accept: 'application/json'}};
fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));


//Ethereum Endpoint
const url2 = 'https://api.coingecko.com/api/v3/simple/price?ids=Ethereum&vs_currencies=usd';
const options2 = {
method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': apiKey}
  };
  fetch(url2, options2)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));

// Usable currencies
const url3 = 'https://api.coingecko.com/api/v3/simple/supported_vs_currencies';
const options3 = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-cg-demo-api-key': apiKey}
};

fetch(url3, options3)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
*/

//Fetching a certain coin with user input
process.stdout.write('What coin would you like the price of? (example Ethereum, Bitcoin) -> ');
process.stdin.on('data', (data) => {
    const name = data.toString().trim().toLocaleLowerCase();
    console.log(`Chosen coin is, ${name}!`);

    const url4 = `https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=usd`;
    //console.log(url4)

    const options4 = {
        method: 'GET',
        headers: {
            accept: 'application/json', 
            'x-cg-demo-api-key': apiKey
        }
    };
    
    fetch(url4, options4)
    .then(res => res.json())
    .then(json => {
        // Access the price properly from the response object
        const price = json[name]?.usd;
        if (price) {
            console.log(`The ${name} price = $${price}`);
        } else {
            console.log('Could not find price for this coin. Make sure you use the correct coin ID.');
        }
        process.exit(); // Exit after getting the response
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit();
    });
  });


