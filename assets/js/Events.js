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