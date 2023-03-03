import superagent from 'superagent'

// We get the weather
export const fetchWeather = (fromCity = 'Le%20Mans') => {
  return superagent // We send a get request without arguments to the api
    .get(`${import.meta.env.VITE_API_URL}/modules/meteo.php?city=${fromCity}`)
}

// We get a quote
export const fetchQuotes = () => {
  return superagent // We send a get request without arguments to the api
    .get(`${import.meta.env.VITE_API_URL}/modules/quotes.php`)
}

// Recovering information about a crypto-currency
export const fetchCryptos = (fromCurrency = 'BTC', toCurrency = 'EUR') => {
  return superagent // We send a get request without arguments to the api
    .get(
        `${import.meta.env.VITE_API_URL}/modules/crypto.php?from=${fromCurrency}&to=${toCurrency}`
    )
}
