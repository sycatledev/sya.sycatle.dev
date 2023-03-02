import { useState } from "react";
import logo from "./assets/sya_logo.jpg";
import Messages from "./components/Messages";
import Login from "./components/Security/Login";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import { login, logout } from "./api/security";

function App() {
  const initialUser = { username: "", password: ""}
  const [user, setUser] = useState(initialUser)
  const [isLogin, setIsLogin] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isBlackTheme, setIsBlackTheme] = useState(false);

  // Change of theme
  const toggleTheme = () => {
    const currentTheme = localStorage.theme === "light" ? "dark" : "light"; // The opposite of the current theme is selected
    localStorage.theme = currentTheme; // We save the choice

    document.documentElement.classList.add(currentTheme); // The theme change is applied
    document.documentElement.classList.remove(
      localStorage.theme === "light" ? "dark" : "light"
    ); // We delete the old theme

    setIsBlackTheme(localStorage.theme !== "light"); // We change the icon of the theme
  };

  // Login
  const handleLogin = () => {
    login(user)
      .end(function (error, res) {
        // We process the data received

        if (error) throw error;

        const data = JSON.parse(res.text); // The JSON data is converted into data that can be understood by Javascript
        if (data.status == 200) {
          // If the request has worked then

          setUser(initialUser)
          setIsLogin(true); // Removal of the modal

          setMessages([
            {
              // Sending the initialized message
              content: `Bonjour, ${data.user.username}. 👋🏻 Comment puis-je vous aider aujourd'hui?`,
              classes: ["font-bold", "text-xl", "lg:text-2xl"],
              background: false,
              isQuestion: false,
            },
          ]);
        }
      });
  };

  // Logout
  const handleLogout = () => {
    logout()
      .end(function (error, res) {
        // We process the data received

        if (error) throw error;

        const data = JSON.parse(res.text); // The JSON data is converted into data that can be understood by Javascript
        if (data.status == 200) {
          // If the request has worked then

          setIsLogin(false); // Display of the modal
          setMessages([]); // The message table is made empty
        } else {
          setMessages((messages) => {
            // Sending an error message
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
    <div className="mx-auto mt-auto max-w-7xl py-16 space-y-8 text-xl">
      <Navbar
        toggleTheme={toggleTheme}
        isBlackTheme={isBlackTheme}
        logout={handleLogout}
      />
      <main>
        <Messages logo={logo} username={user.username} messages={messages} />
        <Menu username={user.username} setMessages={setMessages} />

        {isLogin || (<Login 
          logo={logo}
          setUser={setUser} 
          login={handleLogin} />)}
      </main>
      <Footer />
    </div>
  );
}

export default App;
