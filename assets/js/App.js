import * as Utils from "./Utils.js";
// import * as API from "./js";

/* ---------------- VARIABLES ---------------- */
const page = document.getElementById('main');
const resultsBox = document.getElementById('results');
const buttonsContainer = document.getElementById('buttons');
const disconnectButton = document.getElementById('disconnect-button');
const refreshButton = document.getElementById('refresh-button');
const meteoButton = document.getElementById('meteo-button');
const quoteButton = document.getElementById('quote-button');
const cryptoButton = document.getElementById('crypto-button');

var modalContainer = document.getElementById('modal-container');
var modal = document.getElementById('modal');

var isWriting = false;
var isConnected = false;
var username = "";

/* ---------------- EVENTS ---------------- */
document.addEventListener("DOMContentLoaded", init())

if (disconnectButton != null) disconnectButton.addEventListener("click", () => {
  logout()
});
if (refreshButton != null) refreshButton.addEventListener("click", () => {
  init()
});
if (meteoButton != null) meteoButton.addEventListener("click", async () => {
  await sendQuestion(meteoButton.textContent, fetchWeather)
});
if (quoteButton != null) quoteButton.addEventListener("click", async () => {
  await sendQuestion(quoteButton.textContent, fetchQuotes)
});

if (cryptoButton != null) cryptoButton.addEventListener("click", async () => {
  await sendQuestion(cryptoButton.textContent, fetchCrypto)
});

/* ---------------- FUNCTIONS ---------------- */
function init(){
  if (resultsBox == null) return false;

  buttonsContainer.classList.add("opacity-0");
  buttonsContainer.classList.add("translate-y-full");

  // Clear the results container
  resultsBox.innerHTML = Utils.LOADING_ICON;
  
  if (isConnected == false) {
    fetchLoginForm();
  } else {
    setTimeout(() => {
      resultsBox.innerHTML = "";
      writeMessage(resultsBox, `Bonjour, ${username}. 👋🏻 Comment puis-je vous aider aujourd'hui?`, ["font-bold", "text-xl", "lg:text-2xl"], false);

      setTimeout(() => {
        buttonsContainer.classList.remove("opacity-0");
        buttonsContainer.classList.remove("translate-y-full");
      }, 1500);
    }, 1000);
  }
}

async function sendQuestion(question, action) {
  if (resultsBox == null) return false;
  if (isWriting) return false;

  // Creating the message div
  let messageContainer = document.createElement('div');
  messageContainer.classList.add("flex", "flex-col", "relative", "space-y-1", "p-2", "rounded")
  messageContainer.id = Utils.uuid();

  let questionWrapper = document.createElement('div');
  questionWrapper.classList.add("group", "flex", "relative", "items-center", "space-x-2", "p-2", "rounded") 

  let senderContainer = document.createElement('img');
  // Default classes
  senderContainer.src = `https://eu.ui-avatars.com/api/?name=${username}`;
  senderContainer.classList.add("flex", "h-8", "w-8", "lg:h-10", "lg:w-10", "rounded-full", "duration-200", "items-center");

  let questionContainer = document.createElement('p');
  questionContainer.innerText = question;

  let dateContainer = document.createElement('div');
  dateContainer.classList.add("hidden", "absolute", "right-0", "top-0", "text-sm", "p-1", "lg:group-hover:flex", "font-thin", "text-gray-400")
  dateContainer.innerText = new Date().toLocaleTimeString();

  resultsBox.appendChild(messageContainer);
  messageContainer.appendChild(questionWrapper);

  questionWrapper.appendChild(senderContainer);
  questionWrapper.appendChild(questionContainer);
  questionWrapper.appendChild(dateContainer);
  
  await sendAnswer(messageContainer, action);
}

async function sendAnswer(node, action) {
  // Create the main message container
  let messageContainer = document.createElement('div');
  messageContainer.classList.add("group", "flex", "relative", "items-center", "space-x-2", "p-2", "rounded", "bg-zinc-100", "dark:bg-zinc-800") // Attributes default classes

  // Create sender
  let sender = document.createElement('div');
  sender.classList.add("flex", "items-center", "space-x-2");
  let senderAvatar = document.createElement('img');
  senderAvatar.src = "./assets/img/sya_logo.jpg";
  senderAvatar.classList.add("flex", "flex-col", "h-8", "w-8", "lg:h-10", "lg:w-10", "rounded-full", "mb-auto", "duration-200", "group-hover:shadow-lg");
  sender.appendChild(senderAvatar);

  // Create response container
  let messageParagraph = document.createElement('div');
  messageParagraph.innerHTML = `<span class="h-8 w-8 block rounded-full border-4 border-t-[#6fb463] animate-spin"></span>`;

  let dateContainer = document.createElement('div');
  dateContainer.classList.add("hidden", "absolute", "right-0", "top-0", "text-sm", "p-1", "lg:group-hover:flex", "lg:group-hover:", "font-thin", "text-gray-400")
  dateContainer.innerText = new Date().toLocaleTimeString();

  // Move the message div to the chat container
  node.appendChild(messageContainer);
  messageContainer.appendChild(sender);
  messageContainer.appendChild(messageParagraph);
  messageContainer.appendChild(dateContainer);

  let result = await action();
  // Creating 
  await Utils.typeMessage(messageParagraph, result);

  // Go the the bottom of the page
  document.body.scrollIntoView(false);
}

async function writeMessage(node, message, classes = [], background=true) {
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
  senderAvatar.classList.add("flex", "flex-col", "h-8", "w-8", "lg:h-10", "lg:w-10", "rounded-full", "mb-auto", "duration-200", "group-hover:shadow-lg");
  sender.appendChild(senderAvatar);

  // Create response container
  let messageParagraph = document.createElement('div');
  messageParagraph.innerText = "";

  // Create date container
  let dateContainer = document.createElement('div');
  dateContainer.classList.add("hidden", "absolute", "right-0", "top-0", "text-sm", "p-1", "lg:group-hover:flex", "lg:group-hover:", "font-thin", "text-gray-400")
  dateContainer.innerText = new Date().toLocaleTimeString();

  // Move the message div to the chat container
  node.appendChild(messageContainer);
  messageContainer.appendChild(sender);
  messageContainer.appendChild(messageParagraph);
  messageContainer.appendChild(dateContainer);

  // Creating 
  messageParagraph.innerText = "";
  
  // Get the custom text input value
  await Utils.typeMessage(messageParagraph, message);

  // Go the the bottom of the page
  document.body.scrollIntoView(false);
}


function logout() {
  fetch("http://localhost/Sya-Project/Sya-Backend/src/api/logout.php")
  .then(response => response.json())
  .then(data => {
    if (data.status == 200) {
      username = "";
      isConnected = false;
      init();
    }
  })
  .catch(error => {
    let result = "Une erreur est survenue lors de la requête. Merci de contacter un administrateur.";
    writeMessage(result, 20, ["text-red-500"]);
    console.log(error)
  });
}

async function fetchCrypto(fromSymbol = "BTC", toSymbol = "EUR") {
  return fetch(`https://min-api.cryptocompare.com/data/price?fsym=${fromSymbol}&tsyms=${toSymbol}`)
  .then(response => response.json())
  .then(data => {
    return `1${fromSymbol} vaut actuellement ${data[toSymbol]}${toSymbol}. 💸`
  });
}

async function fetchWeather() {
  return fetch('https://api.weatherapi.com/v1/current.json?key=976b0a2104af409484a181816230202&q=Le%20Mans&aqi=no')
  .then(response => response.json())
  .then(data => {
    let city = data.location.name;
    let country = data.location.country;
    let temperature = data.current.temp_c;

    return `Il fait actuellement ${temperature}°C à ${city}, ${country}. 🌤️`;
  });
}

async function fetchQuotes() {
  return fetch('https://type.fit/api/quotes')
  .then(response => response.json())
  .then(data => {
    let randomQuote = data[Utils.getRandomInt(0, data.length)];
    let text = randomQuote.text;
    let author = `- ${randomQuote.author}`;

    return `\" ${text} \" ${author} 🤔`;
  });
}

async function login(identifier, password) {
  fetch("http://localhost/Sya-Project/Sya-Backend/src/api/login.php", {
      method: "POST",
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ identifier: identifier, password: password }),
  })
  .then(response => response.json())
  .then(data => {
      if (data.status == 200) {
        modal.innerHTML = Utils.LOADING_ICON;

        setTimeout(() => {
          isConnected = true;
          username = data.user.username;
          toggleModal();
          init();
        }, 1000);

      }
  })
  .catch(error => {
      console.log(error)
  });
}

function fetchLoginForm() {
  toggleModal();

  setTimeout(() => {
    fetch('http://localhost/Sya-Project/Sya-Backend/src/server/views/connect.php')
    .then(response => response.text())
    .then(html => {
      modal.innerHTML = html;

      document.getElementById('login-form').addEventListener("submit", function(e) {
        e.preventDefault();

        let identifier = document.getElementById('identifier').value;
        let password = document.getElementById('password').value;
      
        login(identifier, password);
      })
    })
    .catch(error => {
      console.log(error);
    });
  }, 1000);
}

function toggleModal() {
  if (modalContainer.classList.contains('hidden')) {
    modalContainer.classList.remove('hidden');
    modalContainer.classList.add('grid');

    setTimeout(() => {
      modalContainer.classList.remove('opacity-0');
      modal.classList.remove('opacity-0', '-translate-y-full');
    }, 500);
  } else {
    modal.innerHTML = Utils.LOADING_ICON;

    modalContainer.classList.add('opacity-0');
    modal.classList.add('opacity-0', '-translate-y-full');

    setTimeout(() => {
      modalContainer.classList.add('hidden');
      modalContainer.classList.remove('grid');
    }, 500);
  }
}