import Flickity from 'react-flickity-component'
import { fetchCryptos, fetchQuotes, fetchWeather } from '../api/menu'

export default function Menu ({ username, setMessages }) {
  // We get the weather
  const handleFetchWeather = () => {
    fetchWeather()
      .end(function (error, res) {
        // We process the data received
        if (error) throw error

        const data = JSON.parse(res.text) // The JSON data is converted into data that can be understood by Javascript

        let message = 'Une erreur est survenue lors de la requête. Merci de ré-essayer.' // We define the error message
        let classes = ['text-red-500'] // We define the classes of the text
        if (Number(data.status) === 200) {
          // If the request has worked then

          const city = data.response.location.name // We get the city back
          const country = data.response.location.country // We recover the region
          const temperature = data.response.current.temp_c // We recover the temperature

          message = `Il fait actuellement ${temperature}°C à ${city}, ${country}. 🌤️` // Sya's response is defined
          classes = [] // We make the classes table empty because no modification of the classes is to be done
        }

        setMessages((messages) => {
          // We send the message, either an error or the data
          return [
            {
              content: message,
              classes,
              background: true,
              isQuestion: false
            },
            {
              content: 'Météo ☀️',
              classes: [],
              background: false,
              isQuestion: true
            },
            ...messages
          ]
        })
      })
  }

  // We get a quote
  const handleFetchQuotes = () => {
    fetchQuotes()
      .end(function (error, res) {
        // We process the data received
        if (error) throw error

        const data = JSON.parse(res.text) // The JSON data is converted into data that can be understood by Javascript

        let message =
            'Une erreur est survenue lors de la requête. Merci de ré-essayer.' // We define the error message
        let classes = ['text-red-500'] // We define the classes of the text
        if (Number(data.status) === 200) {
          // If the request has worked then

          const text = data.response.quote_text // We retrieve the quote
          const author = `- ${data.response.quote_author}` // The author of the quote is retrieved

          message = `" ${text} " ${author} 🤔` // Sya's response is defined
          classes = [] // We make the classes table empty because no modification of the classes is to be done
        }

        setMessages((messages) => {
          // We send the message, either an error or the data

          return [
            {
              content: message,
              classes,
              background: true,
              isQuestion: false
            },
            {
              content: 'Citations ✨',
              classes: [],
              background: false,
              isQuestion: true
            },
            ...messages
          ]
        })
      })
  }

  // Recovering information about a crypto-currency
  const handleFetchCryptos = (fromCurrency = 'BTC', toCurrency = 'EUR') => {
    fetchCryptos()
      .end(function (error, res) {
        // We process the data received
        if (error) throw error

        const data = JSON.parse(res.text) // The JSON data is converted into data that can be understood by Javascript

        let message =
            'Une erreur est survenue lors de la requête. Merci de ré-essayer.' // We define the error message
        let classes = ['text-red-500'] // We define the classes of the text
        if (Number(data.status) === 200) {
          // If the request has worked then

          message = `1${fromCurrency} vaut actuellement ${data.response[toCurrency]}${toCurrency}. 💸` // Sya's response is defined
          classes = [] // We make the classes table empty because no modification of the classes is to be done
        }

        setMessages((messages) => {
          // We send the message, either an error or the data

          return [
            {
              content: message,
              classes,
              background: true,
              isQuestion: false
            },
            {
              content: 'Cryptos 📈',
              classes: [],
              background: false,
              isQuestion: true
            },
            ...messages
          ]
        })
      })
  }

  return (
    <nav className='fixed bottom-0 left-0 font-semibold py-2 lg:py-4 text-black backdrop-blur-lg bg-zinc-50/70 dark:bg-zinc-900/70 dark:text-white w-full duration-300'>
      <Flickity
        className='carousel p-2 max-w-7xl mx-auto w-full'
        elementType='div'
        options={{
          prevNextButtons: false,
          pageDots: false,
          cellAlign: 'left',
          contain: true,
          freeScroll: true
        }}
        disableImagesLoaded={false}
        static
      >
        <button
          onClick={handleFetchWeather}
          className='carousel-cell mx-1 border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full p-2 lg:p-3 duration-300'
        >
          Météo ☀️
        </button>
        <button
          onClick={handleFetchQuotes}
          className='carousel-cell mx-1 border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full p-2 lg:p-3 duration-300'
        >
          Citations ✨
        </button>
        <button
          onClick={handleFetchCryptos}
          className='carousel-cell mx-1 border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full p-2 lg:p-3 duration-300'
        >
          Cryptos 📈
        </button>
        <button
          onClick={() => {
            setMessages([
              {
                content: `Bonjour, ${username}. 👋🏻 Comment puis-je vous aider aujourd'hui?`,
                classes: ['font-bold', 'text-xl', 'lg:text-2xl'],
                background: false,
                isQuestion: false
              }
            ])
          }}
          className='carousel-cell mx-1 inline-flex items-center border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full p-2 lg:p-3 duration-300 group'
        >
          <span>Réinitialiser</span>
          <svg
            className='h-6 w-6 ml-1 group-hover:animate-spin'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35Z' />
          </svg>
        </button>
      </Flickity>
    </nav>
  )
}
