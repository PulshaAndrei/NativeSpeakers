var React = require('react');
import { browserHistory } from 'react-router'

var Dashboard = React.createClass({

	callApi: function callApi() {
		console.log("callAPi",this.state.profile);
		$.ajax({
			url: 'http://localhost/login',
			method: 'POST',
			data: this.state.profile
		}).then(function (data, textStatus, jqXHR) {
			alert("The request to the secured enpoint was successfull");
		}, function () {
			alert("You need to download the server seed and start it to call this API");
		});
	},
	getInitialState: function getInitialState() {
		return {
			profile: null
		};
	},
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
		console.log(idToken, authHash)
		if (!idToken && authHash) {
			if (authHash.id_token) {
				idToken = authHash.id_token;
				localStorage.setItem('userToken', authHash.id_token);
				browserHistory.push('#/dashboard');
			}
			if (authHash.error) {
				console.log("Error signing in", authHash);
				window.location = "/"
			}
		}
		return idToken;
	},
	componentDidMount: function componentDidMount() {
		this.lock.getProfile(this.state.idToken, function (err, profile) {
			if (err) {
				console.log("Error loading the Profile", err);
				window.location = "/"
			}
			this.setState({ profile: profile });
		}.bind(this));
	},

	render: function render() {
		console.log(this.state.profile)
		return <div>Profile: {this.state.profile ? this.state.profile.nickname : ""}</div>
	}
})

module.exports = Dashboard;