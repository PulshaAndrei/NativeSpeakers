var React = require('react');
import { browserHistory } from 'react-router'

var Dashboard = React.createClass({

	getInitialState: function getInitialState() {
		return {
			profile: null
		};
	},
	componentWillMount: function componentWillMount() {
		this.setupAjax();
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
	componentDidMount: function componentDidMount() {
		$.ajax({
			//url: 'http://localhost/secured/profile',
			url: 'http://ec2-52-50-43-215.eu-west-1.compute.amazonaws.com/secured/profile',
			method: 'GET'
		}).then(function (data, textStatus, jqXHR) {
			this.setState({ profile: data });
		}.bind(this), function () {
			window.location = "./";
		});
	},

	render: function render() {
		console.log(this.state.profile)
		return <div>Profile: {this.state.profile ? this.state.profile.user_id : ""}</div>
	}
})

module.exports = Dashboard;