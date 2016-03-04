var React = require('react');
var Home = require('./Home');

var App = React.createClass({
  componentWillMount: function componentWillMount() {
    this.setupAjax();
    this.createLock();
    this.setState({ idToken: this.getIdToken() });
  },
  createLock: function createLock() {
    this.lock = new Auth0Lock("hTlDLKhkjGBxA2DDJphkBNFSbZmEqy43", "nativespeakers.eu.auth0.com");
  },
  setupAjax: function setupAjax() {
    $.ajaxSetup({
      'beforeSend': function beforeSend(xhr) {
        if (localStorage.getItem('userToken')) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('userToken'));
        }
      }
    });
  },
  getIdToken: function getIdToken() {
    var idToken = localStorage.getItem('userToken');
    var authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
      }
    }
    return idToken;
  },
  render: function render() {
  	if (this.state.idToken){
  		console.log("LoggedIn");
  	}
  	else {
  		console.log("Home");
  	}
    /*if (this.state.idToken) {
      return React.createElement(LoggedIn, { lock: this.lock, idToken: this.state.idToken });
    } else {*/
      return React.createElement(Home, { lock: this.lock });
    //}
  }

})

module.exports = App;