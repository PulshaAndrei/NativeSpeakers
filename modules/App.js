var React = require('react');
var Home = require('./Home');
import { browserHistory } from 'react-router'

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
				browserHistory.push('#/dashboard');
			}
			if (authHash.error) {
				console.log("Error signing in", authHash);
				browserHistory.push('#/');
			}
		}
		return idToken;
	},
	render: function render() {
		//May be need to dashboard???

		if (this.state.idToken){
			browserHistory.push('#/dashboard');
			return null;
		}
		else {
			return React.createElement(Home, { lock: this.lock });
		}
	}

})

module.exports = App;