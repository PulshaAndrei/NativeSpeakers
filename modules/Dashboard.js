var host = "ec2-52-48-222-111.eu-west-1.compute.amazonaws.com";
//var host = "localhost"

var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;
var MenuDashboard = require('./elements/MenuDashboard');
var Footer = require('./elements/Footer');
import messages from './localization/messages';
import { browserHistory } from 'react-router'

var Header = React.createClass({
	mixins: [IntlMixin],
	render: function render (){
		return <header id="first" className="headerDashboard">
			<div className="header-content">
				<div className="inner">
					<h1 className="cursive">Native Speakers</h1>
					<h4>"The limits of my language are the limits of my world." ‒ Ludwig Wittgenstein</h4>
					<br />
					<a className="btn btn-primary btn-xl header-link">Поиск людей</a><span> &nbsp;&nbsp;&nbsp; </span>
					<a className="btn btn-primary btn-xl header-link">Поиск мероприятий</a>
				</div>
			</div>
		</header>
	}
});

var PopularPeople = React.createClass({
	mixins: [IntlMixin],
	render() {
		var array = [{}, {}, {}];
		var users = array.map(function(el,i) {
			return <div className="col-md-4" key={"usersDash"+i}>
						<div className="userTeam">
							<div>
								<img className="backgroundTeam" src="image/english.jpg"/>
								<div className="userImageTeam">
									<img src="image/male_icon.png" />
								</div>
							</div>
							<div className="userInfoTeam">
								<h2>Имя пользователя</h2>
								<button className="btn btn-blue-fill">Познакомиться</button> 
							</div>
						</div>
					</div>;
		});

		return <section className="teamDashboard">
			<div className="container text-center">
				<h1 className="text-primary">Найди команду</h1>
				<h4>Работа в тандеме с носителем языка - лучший способ изучить его</h4>
				<div className="row" style={{marginTop: '45px'}}>
					{users}
				</div>
			</div>
		</section>
	}
})

var Dashboard = React.createClass({

	getInitialState: function getInitialState() {
		var locale = navigator.language.split('-')
		locale = localStorage.getItem('userLocale') ? localStorage.getItem('userLocale') 
			: locale[1] ? `${locale[0]}-${locale[1].toUpperCase()}` : navigator.language
		var strings = messages[locale] ? messages[locale] : messages['en']

		return {
			currentLocale: locale,
			messages: strings,
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
			url: 'http://'+host+'/secured/profile',
			method: 'GET'
		}).then(function (data, textStatus, jqXHR) {
			this.setState({ profile: data });
		}.bind(this), function () {
			localStorage.removeItem('userToken');
			window.location = "./";
		});
	},

	setCurrentLocale: function setCurrentLocale(locale) {
		localStorage.setItem('userLocale', locale);
		var strings = messages[locale] ? messages[locale] : messages['en']
		this.setState({
			currentLocale: locale,
			messages: strings
		})
	},

	render: function render() {
		return <div>
			<MenuDashboard
				messages={this.state.messages} 
				currentLocale={this.state.currentLocale} 
				supportedLocales={messages.supportLanguages}
				setCurrentLocale={this.setCurrentLocale} />
			<Header 
				messages={this.state.messages} />
			<PopularPeople
				messages={this.state.messages} />
			<Footer 
				messages={this.state.messages} />
		</div>
	}
})

module.exports = Dashboard;