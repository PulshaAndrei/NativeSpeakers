// Initialize Auth0Lock with your `clientID` and `domain`
var lock = new Auth0Lock('hTlDLKhkjGBxA2DDJphkBNFSbZmEqy43', 'nativespeakers.eu.auth0.com');

// and deploy it
var login = document.querySelector('a#login')

login.onclick = function (e) {
  e.preventDefault();
  lock.show(function onLogin(err, profile, id_token) {
    if (err) {
      // There was an error logging the user in
      return alert(err.message);
    }

    // User is logged in
  });
};