var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;
var Footer = require('./../elements/Footer');
var EditInformation = require('./EditInformation');
var EditLanguages = require('./EditLanguages');
var Loading = require('react-loading');
import messages from './../messages';
import { browserHistory } from 'react-router';

var MenuDashboard = require('./../elements/MenuDashboard');
var HeaderProfile = require('./../elements/HeaderProfile');

var MenuProfile = React.createClass({
	mixins: [IntlMixin],
	render: function render() {
		return <div className="navigationInProfile">
			<ul>
				<li><a className={this.props.currentEditBlock == 0 ? "currentEditBlock" : ""} onClick={this.props.setEditBlock.bind(null,0)}>{this.getIntlMessage('generaly')}</a></li>
				<li><a className={this.props.currentEditBlock == 1 ? "currentEditBlock" : ""} onClick={this.props.setEditBlock.bind(null,1)}>{this.getIntlMessage('languages')}</a></li>
				<li><a className={this.props.currentEditBlock == 2 ? "currentEditBlock" : ""} onClick={this.props.setEditBlock.bind(null,2)}>{this.getIntlMessage('my_events')}</a></li>
			</ul> 
		</div>
	}
});

var Profile = React.createClass({

	getInitialState: function getInitialState() {
		var locale = navigator.language.split('-')
		locale = localStorage.getItem('userLocale') ? localStorage.getItem('userLocale') 
			: locale[1] ? `${locale[0]}-${locale[1].toUpperCase()}` : navigator.language
		var strings = messages[locale] ? messages[locale] : messages['en']

		return {
			currentLocale: locale,
			messages: strings,
			profile: null,
			editblock: 0
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
			url: 'http://localhost/secured/profile',
			//url: 'http://ec2-52-50-43-215.eu-west-1.compute.amazonaws.com/secured/profile',
			method: 'GET'
		}).then(function (data, textStatus, jqXHR) {
			this.setState({ profile: data });
		}.bind(this), function () {
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

	setEditBlock: function setEditBlock(block) {
		this.setState({editblock: block})
	},

	submitGeneralInfo: function submitGeneralInfo(profile) {
		$.ajax({
			url: 'http://localhost/secured/edit_profile',
			//url: 'http://ec2-52-50-43-215.eu-west-1.compute.amazonaws.com/secured/edit_profile',
			method: 'POST',
			data: profile
		}).then(function (data, textStatus, jqXHR) {
			alert("success");
			this.setState({ profile: Object.assign(this.state.profile, profile) });
		}.bind(this), function (err) {
			alert("error")
		});
	},
	render: function render() {
		return <div>
			<MenuDashboard
				messages={this.state.messages} 
				currentLocale={this.state.currentLocale} 
				supportedLocales={messages.supportLanguages}
				setCurrentLocale={this.setCurrentLocale} />
			<HeaderProfile
				profile={this.state.profile} />
			<MenuProfile
				messages={this.state.messages} 
				setEditBlock={this.setEditBlock}
				currentEditBlock={this.state.editblock} />
			{this.state.profile == null
				? <div className="row vertical-align" style={{margin: 0}}>
					<div className="col-md-12" style={{minHeight: '50%', padding: '0', background: '#f9f9f9'}}>
						<Loading type='bubbles' color='#9C27B0' />
					</div>
				</div>
				: <div>
					{this.state.editblock == 0 && 
						<EditInformation 
							profile={this.state.profile}
							submitGeneralInfo={this.submitGeneralInfo}/>}
					{this.state.editblock == 1 && <EditLanguages />}
				</div>
			}
			<Footer messages={this.state.messages} />
		</div>
	}
})

module.exports = Profile;