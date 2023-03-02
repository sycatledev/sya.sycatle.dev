import superagent from "superagent";

// Login
export const login = ({ username, password }) => {
    return superagent // We send a post request with two arguments (the email address and the password) to the api
      .post(`${import.meta.env.API_URL}/auth/login.php`)
      .send(
        JSON.stringify({
          identifier: username,
          password: password,
        })
      )
  };

  // Logout
export const logout = () => {
    return superagent // We send a get request without arguments to the api
      .get(`${import.meta.env.API_URL}/auth/logout.php`)
  };