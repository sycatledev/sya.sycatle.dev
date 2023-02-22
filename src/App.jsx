import superagent from "superagent";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import logo from "./assets/sya_logo.jpg";
import Flickity from "react-flickity-component";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);
  const [isBlackTheme, setIsBlackTheme] = useState(
    localStorage.theme === "light" ? false : true
  );

  const toggleTheme = () => {
    const currentTheme = localStorage.theme === "light" ? "dark" : "light";
    localStorage.theme = currentTheme;

    document.documentElement.classList.add(currentTheme);
    document.documentElement.classList.remove(
      localStorage.theme === "light" ? "dark" : "light"
    );

    setIsBlackTheme(localStorage.theme === "light" ? false : true);
  };

  const fetchWeather = (fromCity = "Le%20Mans") => {
    superagent
      .get(`http://localhost:8000/src/api/modules/meteo.php?city=${fromCity}`)
      .end(function (error, res) {
        if (error) throw error;

        const data = JSON.parse(res.text);

        let message =
          "Une erreur est survenue lors de la requête. Merci de ré-essayer.";
        if (data.status == 200) {
          let city = data.response.location.name;
          let country = data.response.location.country;
          let temperature = data.response.current.temp_c;

          message = `Il fait actuellement ${temperature}°C à ${city}, ${country}. 🌤️`;
        }

        setMessages((messages) => {
          return [
            {
              content: message,
              classes: [],
              background: true,
              isQuestion: false,
            },
            {
              content: "Météo ☀️",
              classes: [],
              background: false,
              isQuestion: true,
            },
            ...messages,
          ];
        });
      });
  };

  const fetchQuotes = () => {
    superagent
      .get("http://localhost:8000/src/api/modules/quotes.php")
      .end(function (error, res) {
        if (error) throw error;

        const data = JSON.parse(res.text);

        let message =
          "Une erreur est survenue lors de la requête. Merci de ré-essayer.";
        if (data.status == 200) {
          let text = data.response.quote_text;
          let author = `- ${data.response.quote_author}`;

          message = `\" ${text} \" ${author} 🤔`;
        }

        setMessages((messages) => {
          return [
            {
              content: message,
              classes: [],
              background: true,
              isQuestion: false,
            },
            {
              content: "Citations ✨",
              classes: [],
              background: false,
              isQuestion: true,
            },
            ...messages,
          ];
        });
      });
  };

  const fetchCryptos = (fromCurrency = "BTC", toCurrency = "EUR") => {
    superagent
      .get(
        `http://localhost:8000/src/api/modules/crypto.php?from=${fromCurrency}&to=${toCurrency}`
      )
      .end(function (error, res) {
        if (error) throw error;

        const data = JSON.parse(res.text);

        let message =
          "Une erreur est survenue lors de la requête. Merci de ré-essayer.";
        if (data.status == 200) {
          message = `1${fromCurrency} vaut actuellement ${data.response[toCurrency]}${toCurrency}. 💸`;
        }

        setMessages((messages) => {
          return [
            {
              content: message,
              classes: [],
              background: true,
              isQuestion: false,
            },
            {
              content: "Cryptos 📈",
              classes: [],
              background: false,
              isQuestion: true,
            },
            ...messages,
          ];
        });
      });
  };

  const login = () => {
    superagent
      .post("http://localhost:8000/src/api/auth/login.php")
      .send(
        JSON.stringify({
          identifier: username,
          password: password,
        })
      )
      .end(function (error, res) {
        if (error) throw error;

        const data = JSON.parse(res.text);
        setUsername("");
        setPassword("");
        setIsLogin(true);

        setMessages([
          {
            content: `Bonjour, ${data.user.username}. 👋🏻 Comment puis-je vous aider aujourd'hui?`,
            classes: ["font-bold", "text-xl", "lg:text-2xl"],
            background: false,
            isQuestion: false,
          },
        ]);
      });
  };

  const logout = () => {
    superagent
      .get("http://localhost:8000/src/api/auth/logout.php")
      .end(function (error, res) {
        if (error) throw error;

        const data = JSON.parse(res.text);
        if (data.status == 200) {
          setIsLogin(false);
          setMessages([]);
        } else {
          setMessages((messages) => {
            return [
              {
                content:
                  "Une erreur est survenue lors de la requête. Merci de contacter un administrateur.",
                classes: ["text-red-500"],
                background: true,
                isQuestion: false,
              },
              ...messages,
            ];
          });
        }
      });
  };

  return (
    <div class="mx-auto mt-auto max-w-7xl py-16 space-y-8 text-xl">
      <header class="fixed top-0 left-0 font-semibold p-2 text-black backdrop-blur-lg bg-zinc-50/70 dark:bg-zinc-900/70 dark:text-white w-full duration-300 z-50">
        <div class="flex max-w-7xl mx-auto p-2 items-center">
          <a
            title="Sya, votre assistant web"
            href="."
            class="inline-flex items-center space-x-2 z-40"
          >
            <svg
              class="h-12 w-12 fill-black dark:fill-white hover:scale-105 duration-200"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              zoomAndPan="magnify"
              viewBox="0 0 375 374.999991"
              preserveAspectRatio="xMidYMid meet"
              version="1.0"
            >
              <defs>
                <clipPath>
                  <path
                    d="M 13.839844 42 L 361.089844 42 L 361.089844 337.5 L 13.839844 337.5 Z M 13.839844 42 "
                    clip-rule="nonzero"
                  />
                </clipPath>
              </defs>
              <g clip-path="url(#93219ad2fd)">
                <path
                  d="M 274.277344 242.125 C 274.277344 256.527344 262.625 268.179688 248.226562 268.179688 C 233.859375 268.179688 222.207031 256.527344 222.207031 242.125 C 222.207031 227.726562 233.859375 216.070312 248.226562 216.070312 C 262.625 216.070312 274.277344 227.726562 274.277344 242.125 Z M 152.75 242.125 C 152.75 256.527344 141.066406 268.179688 126.699219 268.179688 C 112.304688 268.179688 100.652344 256.527344 100.652344 242.125 C 100.652344 227.726562 112.304688 216.070312 126.699219 216.070312 C 141.066406 216.070312 152.75 227.726562 152.75 242.125 Z M 309.019531 285.542969 C 308.988281 304.71875 293.453125 320.261719 274.277344 320.261719 L 100.652344 320.261719 C 81.476562 320.261719 65.9375 304.71875 65.9375 285.542969 L 65.9375 198.710938 C 65.9375 179.53125 81.476562 163.992188 100.652344 163.960938 L 274.277344 163.960938 C 293.453125 163.992188 308.988281 179.53125 309.019531 198.710938 Z M 335.039062 216.070312 L 326.34375 216.070312 L 326.34375 198.710938 C 326.34375 169.941406 303.039062 146.601562 274.277344 146.601562 L 204.820312 146.601562 L 204.820312 107.070312 C 221.4375 97.480469 227.140625 76.238281 217.519531 59.617188 C 207.933594 42.996094 186.722656 37.324219 170.105469 46.914062 C 153.492188 56.503906 147.789062 77.746094 157.40625 94.335938 C 160.425781 99.640625 164.835938 104.019531 170.105469 107.070312 L 170.105469 146.601562 L 100.652344 146.601562 C 71.886719 146.601562 48.550781 169.941406 48.550781 198.710938 L 48.550781 216.070312 L 39.886719 216.070312 C 25.492188 216.070312 13.839844 227.726562 13.839844 242.125 C 13.839844 256.527344 25.492188 268.179688 39.886719 268.179688 L 48.550781 268.179688 L 48.550781 285.542969 C 48.550781 314.308594 71.886719 337.652344 100.652344 337.652344 L 274.277344 337.652344 C 303.039062 337.652344 326.34375 314.308594 326.34375 285.542969 L 326.34375 268.179688 L 335.039062 268.179688 C 349.4375 268.179688 361.089844 256.527344 361.089844 242.125 C 361.089844 227.726562 349.4375 216.070312 335.039062 216.070312 "
                  fill-opacity="1"
                  fill-rule="nonzero"
                />
              </g>
            </svg>
          </a>
          <div class="flex ml-auto items-center space-x-2">
            <button
              title="Changer la couleur de votre thème"
              class="flex items-center border fill-black dark:fill-white hover:fill-white dark:hover:fill-black hover:bg-black dark:hover:bg-white rounded-full p-2 lg:p-3 duration-300 group"
              onClick={toggleTheme}
            >
              <svg class="w-6 h-6 inline-flex items-center">
                {isBlackTheme ? (
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d={
                      "M12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3Zm0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5ZM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1Zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1ZM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1Zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1ZM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .38-.39.39-1.03 0-1.41L5.99 4.58Zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06Zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.41 0l1.06-1.06ZM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.41 0l1.06-1.06Z"
                    }
                  />
                ) : (
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d={
                      "M9.37 5.51A7.35 7.35 0 0 0 9.1 7.5c0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27A7.014 7.014 0 0 1 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49ZM12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1Z"
                    }
                  />
                )}
              </svg>
            </button>
            <button
              title="Se déconnecter"
              onClick={() => logout()}
              class="flex items-center border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full p-2 lg:p-3 duration-300 group"
            >
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.08 15.59 16.67 13H7v-2h9.67l-2.59-2.59L15.5 7l5 5-5 5-1.42-1.41ZM19 3a2 2 0 0 1 2 2v4.67l-2-2V5H5v14h14v-2.67l2-2V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.11.89-2 2-2h14Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main>
        <div class="px-1 flex flex-col space-y-2">
          {messages
            .slice(0)
            .reverse()
            .map((message, index) =>
              message.isQuestion ? (
                <div
                  key={index}
                  className="flex flex-col relative space-y-1 p-2 rounded"
                >
                  <div className="group flex relative items-center space-x-2 p-2 rounded">
                    <img
                      src={`https://eu.ui-avatars.com/api/?name=${username}`}
                      className="flex h-8 w-8 lg:h-10 lg:w-10 rounded-full duration-200 items-center"
                    />

                    <p>{message.content}</p>

                    <div className="hidden absolute right-0 top-0 text-sm p-1 lg:group-hover:flex font-thin text-gray-400">
                      {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ) : (
                <p
                  key={index}
                  className={[
                    "group",
                    "flex",
                    "relative",
                    "items-center",
                    "space-x-2",
                    "p-2",
                    "rounded",
                    ...(message.background
                      ? ["bg-zinc-100", "dark:bg-zinc-800"]
                      : []),
                    ...message.classes,
                  ].join(" ")}
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src={logo}
                      className="flex flex-col h-8 w-8 lg:h-10 lg:w-10 rounded-full mb-auto duration-200 group-hover:shadow-lg"
                    />
                  </div>

                  <TypeAnimation
                    sequence={[message.content]}
                    speed={50}
                    cursor={false}
                    wrapper="div"
                  />

                  <div className="hidden absolute right-0 top-0 text-sm p-1 lg:group-hover:flex lg:group-hover: font-thin text-gray-400">
                    {new Date().toLocaleTimeString()}
                  </div>
                </p>
              )
            )}
        </div>

        <nav class="fixed bottom-0 left-0 font-semibold py-2 lg:py-4 text-black backdrop-blur-lg bg-zinc-50/70 dark:bg-zinc-900/70 dark:text-white w-full duration-300">
          <Flickity
            className={"carousel p-2 max-w-7xl mx-auto w-full"}
            elementType={"div"}
            options={{
              prevNextButtons: false,
              pageDots: false,
              cellAlign: "left",
              contain: true,
              freeScroll: true,
            }}
            disableImagesLoaded={false}
            static
          >
            <button
              onClick={() => fetchWeather()}
              class="carousel-cell mx-1 border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full p-2 lg:p-3 duration-300"
            >
              Météo ☀️
            </button>
            <button
              onClick={() => fetchQuotes()}
              class="carousel-cell mx-1 border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full p-2 lg:p-3 duration-300"
            >
              Citations ✨
            </button>
            <button
              onClick={() => fetchCryptos()}
              class="carousel-cell mx-1 border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full p-2 lg:p-3 duration-300"
            >
              Cryptos 📈
            </button>
            <button
              onClick={() => {
                setMessages([
                  {
                    content: `Bonjour, ${username}. 👋🏻 Comment puis-je vous aider aujourd'hui?`,
                    classes: ["font-bold", "text-xl", "lg:text-2xl"],
                    background: false,
                    isQuestion: false,
                  },
                ]);
              }}
              class="carousel-cell mx-1 inline-flex items-center border hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full p-2 lg:p-3 duration-300 group"
            >
              <span>Réinitialiser</span>
              <svg
                class="h-6 w-6 ml-1 group-hover:animate-spin"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35Z"></path>
              </svg>
            </button>
          </Flickity>
        </nav>

        {isLogin ? (
          ""
        ) : (
          <div class="grid fixed top-0 left-0 w-full h-full bg-black/40 backdrop-blur-lg z-[9998] duration-200">
            <div class="w-full h-full lg:h-full lg:min-h-fit lg:max-h-[33rem] lg:w-full lg:max-w-xl p-4 rounded shadow m-auto duration-500 items-center align-middle bg-zinc-50/90 dark:bg-zinc-900/70 backdrop-blur-lg">
              <div class="p-2 lg:p-6 space-y-4 m-auto items-center h-full">
                <img
                  class="h-20 w-20 mx-auto rounded-full"
                  src={logo}
                  alt="SYA"
                />
                <h1 class="font-bold text-center text-2xl">Bon retour 🦾</h1>

                <p class="text-sm text-gray-500 dark:text-gray-400 font-thin">
                  Connexion avec votre compte{" "}
                  <span class="text-[#6fb463]">sycatle.dev</span>
                </p>

                <label for="identifier" class="flex flex-col space-y-2">
                  <span class="text-lg font-semibold">
                    Pseudonyme / Adresse électronique
                  </span>
                  <input
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    name="identifier"
                    class="rounded-lg shadow focus:border-b-2 border-[#6fb463] bg-white dark:bg-black p-2 outline-none"
                  />
                </label>
                <label for="password" class="flex flex-col space-y-2">
                  <span class="text-lg font-semibold">Mot de passe</span>
                  <span class="flex relative items-center">
                    <svg
                      onclick="this.setAttribute('type', this.getAttribute('type') == 'password' ? 'text' : 'password')"
                      class="h-6 w-6 text-gray-500 dark:text-gray-400 hover:cursor-pointer absolute right-0 mr-2 p-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5ZM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Zm-3-5c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3Z"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <input
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      class="w-full rounded-lg shadow focus:border-b-2 border-[#6fb463] bg-white dark:bg-black p-2 outline-none"
                    />
                  </span>
                </label>

                <div class="flex flex-col-reverse lg:flex-row space-y-4 items-center lg:justify-between">
                  <a
                    href="https://sycatle.dev"
                    class="text-gray-500 dark:text-gray-400 text-sm hover:underline my-2"
                  >
                    Retourner sur sycatle.dev
                  </a>
                  <button
                    onClick={() => login()}
                    class="flex font-normal p-3 bg-[#6fb463] shadow hover:bg-[#4f8f44] lg:shadow-lg rounded"
                  >
                    Se connecter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer>
        <span class="hidden lg:inline-flex fixed right-0 bottom-0 p-2 mt-auto text-sm items-center text-gray-500 font-thins">
          Sya v1.1-ALPHA
          <a
            title="Powered by sycatle.dev"
            href="https://sycatle.dev"
            target="__blank"
            class=" ml-1"
          >
            <svg
              class="h-10 w-10 fill-black dark:fill-white hover:scale-105 duration-200"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              zoomAndPan="magnify"
              viewBox="0 0 375 374.999991"
              preserveAspectRatio="xMidYMid meet"
              version="1.0"
              data-arp-injected="true"
            >
              <defs>
                <clipPath>
                  <path
                    d="M 40.511719 40.511719 L 334.511719 40.511719 L 334.511719 334.511719 L 40.511719 334.511719 Z M 40.511719 40.511719 "
                    clip-rule="nonzero"
                  ></path>
                </clipPath>
              </defs>
              <g clip-path="url(#f7eadf1f08)">
                <path
                  d="M 261.558594 142.507812 C 257.972656 136.644531 253.6875 131.136719 248.789062 126.324219 C 233.128906 110.667969 211.4375 100.957031 187.554688 100.957031 C 163.675781 100.957031 141.980469 110.667969 126.324219 126.324219 C 116.964844 135.683594 109.792969 147.144531 105.417969 159.914062 L 201.902344 178.808594 L 208.8125 180.121094 L 285.964844 195.167969 L 296.546875 197.265625 C 294.1875 223.59375 282.554688 247.214844 264.972656 264.882812 C 245.203125 284.652344 217.820312 296.898438 187.644531 296.898438 C 148.105469 296.898438 111.980469 281.851562 84.773438 257.273438 L 84.773438 257.183594 C 107.867188 291.300781 146.355469 311.769531 187.644531 311.769531 C 221.933594 311.769531 252.988281 297.859375 275.46875 275.378906 C 297.949219 252.898438 311.855469 221.847656 311.855469 187.554688 C 311.855469 185.019531 311.769531 182.570312 311.683594 180.121094 L 296.546875 177.148438 L 273.019531 172.511719 L 195.253906 157.289062 L 331.539062 157.289062 C 333.550781 167 334.601562 177.148438 334.601562 187.46875 C 334.601562 228.058594 318.15625 264.796875 291.5625 291.386719 C 264.972656 317.980469 228.230469 334.425781 187.644531 334.425781 C 147.054688 334.425781 110.316406 317.980469 83.726562 291.386719 C 67.453125 275.117188 54.945312 255 47.683594 232.519531 C 67.628906 232.519531 87.574219 232.519531 107.519531 232.519531 L 113.640625 232.519531 C 117.226562 238.378906 121.511719 243.890625 126.410156 248.699219 C 142.070312 264.359375 163.761719 274.066406 187.644531 274.066406 C 211.523438 274.066406 233.21875 264.359375 248.875 248.699219 C 258.234375 239.339844 265.40625 227.882812 269.695312 215.109375 L 179.070312 197.441406 L 166.300781 194.902344 L 89.148438 179.859375 L 78.5625 177.757812 C 80.839844 151.429688 92.558594 127.8125 110.140625 110.140625 C 129.910156 90.371094 157.289062 78.125 187.46875 78.125 C 227.007812 78.125 263.132812 93.171875 290.339844 117.753906 C 285.878906 111.191406 280.890625 105.15625 275.378906 99.644531 C 252.898438 77.164062 221.847656 63.253906 187.554688 63.253906 C 153.265625 63.253906 122.214844 77.164062 99.730469 99.644531 C 77.25 122.125 63.34375 153.179688 63.34375 187.46875 C 63.34375 190.003906 63.429688 192.453125 63.519531 194.902344 L 78.652344 197.878906 L 102.183594 202.515625 L 179.945312 217.734375 C 134.546875 217.734375 89.0625 217.734375 43.660156 217.734375 C 41.648438 208.023438 40.601562 197.878906 40.601562 187.554688 C 40.601562 146.96875 57.046875 110.230469 83.636719 83.636719 C 110.230469 57.046875 146.96875 40.601562 187.554688 40.601562 C 228.144531 40.601562 264.882812 57.046875 291.476562 83.636719 C 307.746094 99.90625 320.253906 120.027344 327.515625 142.507812 C 305.558594 142.507812 283.515625 142.507812 261.558594 142.507812 Z M 261.558594 142.507812 "
                  fill-opacity="1"
                  fill-rule="nonzero"
                ></path>
              </g>
            </svg>
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;
