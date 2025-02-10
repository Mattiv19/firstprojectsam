const apiKey = process.env.NEXT_PUBLIC_API_KEY

//Ping site -> Response = { gecko_says: '(V3) To the Moon!' }
const url = 'https://api.coingecko.com/api/v3/ping';
const options = {method: 'GET', headers: {accept: 'application/json'}};
fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));

