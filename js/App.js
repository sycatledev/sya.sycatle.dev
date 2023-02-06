import * as Utils from "./Utils.js";

/* ---------------- VARIABLES ---------------- */
// const searchInput = document.querySelector('#input');
const resultsContainer = document.getElementById('results');
const buttonsContainer = document.getElementById('buttons');
const disconnectButton = document.getElementById('disconnect-button');
const refreshButton = document.getElementById('refresh-button');
const meteoButton = document.getElementById('meteo-button');
const quoteButton = document.getElementById('quote-button');
const cryptoButton = document.getElementById('crypto-button');
// const bitcoinContainer = document.getElementById('bitcoin');
const loginForm = document.getElementById('login-form');

var isWriting = false;

/* ---------------- EVENTS ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  init();
})
if (loginForm != null) loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  let identifier = document.getElementById('identifier').value;
  let password = document.getElementById('password').value;

  login(identifier, password);
})
if (disconnectButton != null) disconnectButton.addEventListener("click", () => {
  logout();
});
if (refreshButton != null) refreshButton.addEventListener("click", () => {
  init();
});
if (meteoButton != null) meteoButton.addEventListener("click", () => {
  writeMessage(fetchWeather(), 250);
});
if (quoteButton != null) quoteButton.addEventListener("click", () => {
  writeMessage(fetchQuotes(), 250);
});
if (cryptoButton != null) cryptoButton.addEventListener("click", () => {
  writeMessage(fetchCrypto(), 250);
});
// searchInput.addEventListener('keyup', function() {
//   fetch(`./src/api/users.php?query=${this.value}`)
//     .then(response => response.json())
//     .then(data => {
//       resultsContainer.innerHTML = '';
//       data.forEach(user => {
//         const result = document.createElement('div');
//         result.innerHTML = `
//           <p>Name: ${user.user_name}</p>
//           <p>Email: ${user.user_mail}</p>
//         `;
//         resultsContainer.appendChild(result);
//       });
//     })
//     .catch(error => console.error(error));
// });

/* ---------------- FUNCTIONS ---------------- */
function init(){
  resultsContainer.innerHTML = "";
  writeMessage("Bonjour, Charlie. Comment puis-je vous aider aujourd'hui? 👋🏻", 25, ["font-bold", "text-3xl"]);
  setTimeout(() => {
    buttonsContainer.classList.remove("opacity-0");
    buttonsContainer.classList.remove("translate-y-full");
  }, 1500);
}

function writeMessage(message, speed=100, classes = []) {
  if (!message) return false;
  if (isWriting) return false;

  isWriting = true;

  const div = document.createElement('div');
  for (let classe in classes) {
    div.classList.add(classes[classe]);
  }
  div.classList.add("p-2", "my-1", "hover:bg-zinc-200", "dark:hover:bg-zinc-800")
  resultsContainer.appendChild(div);

  div.innerText = "";         // Clear the animation element before starting again
  const str = message;     // Get the custom text input value
  const chars = str.split(""); // Split the text string value and add it to an array: "123" => ["1","2","3"]
  const interval = setInterval(()=>{
    if (!chars.length){ 
      return clearInterval(interval); // Stop the animation once we're out of characters.
    }
    div.textContent += chars.shift(); // Remove the first character from the array and append it to the text display element
  }, speed);

  document.body.scrollIntoView(false);

  isWriting = false;
}

function login(identifier, password) {
  fetch("./src/api/login.php?identifier=" + identifier + "&password=" + password)
  .then(response => response.json())
  .then(data => {
    if (data.status == 200) {
      console.log(data);
      let token = data.token;
      let button = document.querySelector('#login-form');
      button.innerHTML = "Bon retour " + data.user.username
    }
  })
  .catch(error => {
    let result = "- Une erreur est survenue lors de la requête. Merci de contacter un administrateur.";
    writeMessage(result, 20, ["text-red-500"]);
    console.log(error)
  });
}

function logout() {
  fetch("./src/api/logout.php")
  .then(response => response.json())
  .then(data => {
    if (data.status == 200) {
      console.log(data);
    }
  })
  .catch(error => {
    let result = "- Une erreur est survenue lors de la requête. Merci de contacter un administrateur.";
    writeMessage(result, 20, ["text-red-500"]);
    console.log(error)
  });
}

function fetchCrypto(fromSymbol = "BTC", toSymbol = "EUR") {
  fetch("https://min-api.cryptocompare.com/data/price?fsym=" + fromSymbol + "&tsyms=" + toSymbol)
  .then(response => response.json())
  .then(data => {
    // bitcoinContainer.innerText = data.EUR;
    // bitcoinHistory.push(data.EUR);
    let result = "- 1 " + fromSymbol + " vaut actuellement " + data[toSymbol] + " " + toSymbol + ". 💸";
    writeMessage(result, 20);
  })
  .catch(error => {
    let result = "- Une erreur est survenue lors de la requête. Merci de contacter un administrateur.";
    writeMessage(result, 20, ["text-red-500"]);
    console.log(error)
  });
}

function fetchWeather() {
  fetch('https://api.weatherapi.com/v1/current.json?key=976b0a2104af409484a181816230202&q=Le%20Mans&aqi=no')
  .then(response => response.json())
  .then(data => {
    let city = data.location.name;
    let country = data.location.country;
    let temperature = data.current.temp_c;

    let result = "- Il fait actuellement " + temperature + "°C à " + city + ", " + country + ". 🌤️";
    writeMessage(result, 40);
  })
  .catch(error => {
    let result = "- Une erreur est survenue lors de la requête. Merci de contacter un administrateur.";
    writeMessage(result, 20, ["text-red-500"]);
    console.log(error)
  });
}

function fetchQuotes() {
  fetch('https://type.fit/api/quotes')
  .then(response => response.json())
  .then(data => {
    let randomQuote = data[Utils.getRandomInt(0, data.length)];
    let text = randomQuote.text;
    let author = "- " + randomQuote.author;

    let result = "- \"" + text + "\"" + author + " 🤔";
    writeMessage(result, 20);
  });
}