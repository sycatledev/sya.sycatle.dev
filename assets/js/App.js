import * as Utils from "./Utils.js";

/* ---------------- VARIABLES ---------------- */
const resultsContainer = document.getElementById('results');
const buttonsContainer = document.getElementById('buttons');
const disconnectButton = document.getElementById('disconnect-button');
const refreshButton = document.getElementById('refresh-button');
const meteoButton = document.getElementById('meteo-button');
const quoteButton = document.getElementById('quote-button');
const cryptoButton = document.getElementById('crypto-button');
const loginForm = document.getElementById('login-form');
var isWriting = false;

var username = "Charlie";

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
  sendCommand(meteoButton.textContent)
  writeMessage(fetchWeather(), 200);
});
if (quoteButton != null) quoteButton.addEventListener("click", () => {
  sendCommand(quoteButton.textContent)
  writeMessage(fetchQuotes(), 200);
});
if (cryptoButton != null) cryptoButton.addEventListener("click", () => {
  sendCommand(cryptoButton.textContent)
  writeMessage(fetchCrypto(), 200);
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
  if (resultsContainer == null) return false;

  resultsContainer.innerHTML = "";
  writeMessage(`Bonjour, ${username}. 👋🏻 Comment puis-je vous aider aujourd'hui?`, 25, ["font-bold", "text-xl", "lg:text-2xl"], false, false);
  setTimeout(() => {
    buttonsContainer.classList.remove("opacity-0");
    buttonsContainer.classList.remove("translate-y-full");
  }, 1500);
}

function sendCommand(command) {
  console.log(command);
  if (resultsContainer == null) return false;
  if (!command) return false;

  // Creating the message div
  let messageDiv = document.createElement('p');
  let senderImage = document.createElement('img');
  let messageParagraph = document.createElement('span');

  // Move the message div to the chat container
  resultsContainer.appendChild(messageDiv);
  messageDiv.appendChild(senderImage);
  messageDiv.appendChild(messageParagraph);
  messageDiv.classList.add("flex", "relative", "items-center", "space-x-2", "p-2", "rounded") // Default classes

  senderImage.src = `https://eu.ui-avatars.com/api/?name=${username}`;
  senderImage.classList.add("h-8", "w-8", "lg:h-10", "lg:w-10", "rounded-full", "mb-auto", "duration-200");

  // Creating 
  messageParagraph.innerText = command;
}

function writeMessage(message, speed=100, classes = [], reply=true, background=true, ) {
  if (resultsContainer == null) return false;
  if (!message) return false;
  if (isWriting) return false;

  isWriting = true;

  // Create the main message container
  let messageContainer = document.createElement('p');
  messageContainer.classList.add("group", "flex", "relative", "items-center", "space-x-2", "p-2", "rounded") // Attributes default classes
  for (let classe in classes) { // Attributes specified classes
    messageContainer.classList.add(classes[classe]);
  }
  if (background) messageContainer.classList.add("bg-zinc-100", "dark:bg-zinc-800");

  // Create sender
  let sender = document.createElement('div');
  sender.classList.add("flex", "items-center", "space-x-2");
  let senderAvatar = document.createElement('img');
  senderAvatar.src = "./assets/img/sya_logo.jpg";
  senderAvatar.classList.add("h-8", "w-8", "lg:h-10", "lg:w-10", "rounded-full", "mb-auto", "duration-200", "group-hover:shadow-lg");
  sender.appendChild(senderAvatar);
  if (reply) {
    let replyVector = Utils.renderReplyIcon();
    console.log(replyVector)
    replyVector.classList.add("h-6", "w-6");
    sender.appendChild(replyVector);
  }

  // Create response container
  let messageParagraph = document.createElement('span');
  messageParagraph.innerText = "";

  // Create date container
  let dateContainer = document.createElement('div');
  dateContainer.classList.add("hidden", "absolute", "right-0", "top-0", "text-sm", "p-1", "lg:group-hover:flex", "lg:group-hover:", "font-thin", "text-gray-400")
  dateContainer.innerText = new Date().toLocaleTimeString();

  // Move the message div to the chat container
  resultsContainer.appendChild(messageContainer);
  messageContainer.appendChild(sender);
  messageContainer.appendChild(messageParagraph);
  messageContainer.appendChild(dateContainer);

  // messageParagraph.classList.add("col-span-11");

  // Creating 
  messageParagraph.innerText = "";       // Get the custom text input value
  const characters = message.split(""); // Split the text string value and add it to an array: "123" => ["1","2","3"]
  const interval = setInterval(()=>{
    if (!characters.length){ 
      return clearInterval(interval); // Stop the animation once we're out of characters.
    }
    messageParagraph.textContent += characters.shift(); // Remove the first character from the array and append it to the text display element
  }, speed);

  // Go the the bottom of the page
  document.body.scrollIntoView(false);

  isWriting = false;
}

function login(identifier, password) {
  fetch("./src/api/login.php", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ identifier: identifier, password: password }),
  })
  .then(response => console.log(response.json()))
  .then(data => {
    if (data.status == 200) {
      console.log(data);
      let token = data.token;
      let button = document.querySelector('#login-form');
      button.innerHTML = "Bon retour " + data.user.username
    }
  })
  .catch(error => {
    let result = "Une erreur est survenue lors de la requête. Merci de contacter un administrateur.";
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
    let result = "Une erreur est survenue lors de la requête. Merci de contacter un administrateur.";
    writeMessage(result, 20, ["text-red-500"]);
    console.log(error)
  });
}

function fetchCrypto(fromSymbol = "BTC", toSymbol = "EUR") {
  fetch(`https://min-api.cryptocompare.com/data/price?fsym=${fromSymbol}&tsyms=${toSymbol}`)
  .then(response => response.json())
  .then(data => {
    let result = `1${fromSymbol} vaut actuellement ${data[toSymbol]}${toSymbol}. 💸`;
    writeMessage(result, 20);
  })
  .catch(error => {
    let result = "Une erreur est survenue lors de la requête. Merci de contacter un administrateur.";
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

    let result = `Il fait actuellement ${temperature}°C à ${city}, ${country}. 🌤️`;
    writeMessage(result, 40);
  })
  .catch(error => {
    let result = "Une erreur est survenue lors de la requête. Merci de contacter un administrateur.";
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
    let author = `- ${randomQuote.author}`;

    let result = `\" ${text} \" ${author} 🤔`;
    writeMessage(result, 20);
  });
}