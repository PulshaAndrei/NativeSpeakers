var host = "ec2-52-30-233-144.eu-west-1.compute.amazonaws.com";
//var host = "localhost"

var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;
var Footer = require('./../elements/Footer');
var EditInformation = require('./EditInformation');
var EditLanguages = require('./EditLanguages');
var Loading = require('react-loading');
import messages from './../localization/messages';
import { browserHistory } from 'react-router';
import AlertContainer from 'react-alert';

var MenuDashboard = require('./../elements/MenuDashboard');
var HeaderProfile = require('./../elements/HeaderProfile');

var MenuProfile = React.createClass({
	mixins: [IntlMixin],
	/*<li><a className={this.props.currentEditBlock == 2 ? "currentEditBlock" : ""} onClick={this.props.setEditBlock.bind(null,2)}>{this.getIntlMessage('my_events')}</a></li>*/
	render: function render() {
		return <div className="navigationInProfile">
			<h2 className="text-center visible-xs-block" style={{marginTop: '50px'}}>{this.props.profile ? this.props.profile.given_name+" "+this.props.profile.family_name : ""}</h2>
			<ul className="hidden-xs">
				<li><a className={this.props.currentEditBlock == 0 ? "currentEditBlock" : ""} onClick={this.props.setEditBlock.bind(null,0)}>{this.getIntlMessage('generaly')}</a></li>
				<li><a className={this.props.currentEditBlock == 1 ? "currentEditBlock" : ""} onClick={this.props.setEditBlock.bind(null,1)}>{this.getIntlMessage('languages')}</a></li>
			</ul> 
			<div className="visible-xs-block mobNavInProfile">
				<a className={this.props.currentEditBlock == 0 ? "currentEditBlock" : ""} onClick={this.props.setEditBlock.bind(null,0)}>{this.getIntlMessage('generaly')}</a>
				<a className={this.props.currentEditBlock == 1 ? "currentEditBlock" : ""} onClick={this.props.setEditBlock.bind(null,1)}>{this.getIntlMessage('languages')}</a>
			</div>
		</div>
	}
});

var Profile = React.createClass({

	getInitialState: function getInitialState() {
		var locale = navigator.language.split('-')
		locale = localStorage.getItem('userLocale') ? localStorage.getItem('userLocale') 
			: (locale[0] ? locale[0] : 'en')
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
			url: 'http://'+host+'/secured/profile',
			method: 'GET'
		}).then(function (data, textStatus, jqXHR) {
			this.setState({ profile: data });
		}.bind(this), function () {
			localStorage.removeItem('userToken');
			window.location = "./";
		});
		setTimeout(function(){
			$('body').scrollspy({target:'.navbar-fixed-top',offset:60});
			$('#topNav').affix({offset:{top:50}});
			new WOW().init();
		}, 500);
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
		var self = this;
		$.ajax({
			url: 'http://'+host+'/secured/edit_profile',
			method: 'POST',
			data: profile
		}).then(function (data, textStatus, jqXHR) {
			this.showAlertSuccess();
			this.setState({ profile: Object.assign(this.state.profile, profile) });
		}.bind(this), function (err) {
			self.showAlertError(err.statusText);
		});
	},
	submitLanguages: function submitLanguages(data) {
		var self = this;
		$.ajax({
			url: 'http://'+host+'/secured/edit_languages',
			method: 'POST',
			data: {languages_list: JSON.stringify(data)}
		}).then(function (dt, textStatus, jqXHR) {
			this.showAlertSuccess()
			var profile = this.state.profile;
			profile.languages = data;
			this.setState({ profile: profile });
		}.bind(this), function (err) {
			self.showAlertError(err.statusText);
		});
	},
	uploadAvatar: function uploadAvatar(dataUri) {
		var self = this;
		$.ajax({
			url: 'http://'+host+'/secured/uploadPhoto',
			method: 'POST',
			contentType: "application/x-www-form-urlencoded",
			cache: false,
			data: { img_data:dataUri }			
		}).then(function (dt, textStatus, jqXHR) {
			this.showAlertSuccess()
		}.bind(this), function (err) {
			self.showAlertError(err.statusText);
		});
	},
	showAlertSuccess(){
	    this.msg.show(this.state.messages.data_saccessfully_chaged, {
	      time: 10000,
	      type: 'success',
	      icon: <img src="image/icon_success.png" />
	    });
	},
	showAlertError(err){
	    this.msg.show(this.state.messages.error+': '+err, {
	      time: 2000,
	      type: 'error',
	      icon: <img src="image/icon_error.png" />
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
				profile={this.state.profile} 
				uploadAvatar={this.uploadAvatar} />
			<MenuProfile
				messages={this.state.messages}
				profile={this.state.profile} 
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
							messages={this.state.messages} 
							profile={this.state.profile}
							submitGeneralInfo={this.submitGeneralInfo} />}
					{this.state.editblock == 1 && 
						<EditLanguages 
							messages={this.state.messages} 
							profile={this.state.profile} 
							submitLanguages={this.submitLanguages} />}
				</div>
			}
			<Footer 
				messages={this.state.messages} />
			<AlertContainer 
				ref={a => this.msg = a} 
				offset={0}
				position='bottom left'
				theme='dark'      
				time={5000}
				transition='scale' />
		</div>
	}
})

module.exports = Profile;