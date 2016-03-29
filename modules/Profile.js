var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;
var DateTimeField = require('react-bootstrap-datetimepicker');
var Footer = require('./elements/Footer');
import messages from './messages';
import { browserHistory } from 'react-router';

var MenuDashboard = require('./elements/MenuDashboard');
var HeaderProfile = require('./elements/HeaderProfile');

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

var EditInformation = React.createClass({
	render: function render() {
		return <div className="editblock">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h5 className="contacts_header">Information</h5>
					</div>
					<div className="col-md-4">
						<div className="field">
							<div className="field-title">Given name</div>
							<input className="form-control-bootstrap" type="text" />
						</div>
						<div className="field">
							<div className="field-title">Family name</div>
							<input className="form-control-bootstrap" type="text" />
						</div>
						<div className="field">
							<div className="field-title">Gender</div>
							<div className="btn-group field-radio" data-toggle="buttons">
							  <label className="btn btn-info active">
							    <input type="radio" name="options" id="option1" autocomplete="off" checked /> Male
							  </label>
							  <label className="btn btn-info">
							    <input type="radio" name="options" id="option2" autocomplete="off" /> Female
							  </label>
							</div>
						</div>
						<div className="field">
							<div className="field-title">Birthday</div>
							<DateTimeField />
						</div>
					</div>
					<div className="col-md-4">
						<div className="field">
							<div className="field-title">Country</div>
							<input className="form-control-bootstrap" type="text" />
						</div>
						<div className="field">
							<div className="field-title">City</div>
							<input className="form-control-bootstrap" type="text" />
						</div>
						<div className="field">
							<div className="field-title">Education</div>
							<input className="form-control-bootstrap" type="text" />
						</div>
						<div className="field">
							<div className="field-title">Profession</div>
							<input className="form-control-bootstrap" type="text" />
						</div>
					</div>
					<div className="col-md-4">
						<div className="field">
							<div className="field-title">About you</div>
							<textarea className="form-control-bootstrap" rows="14" style={{height:'287px'}}></textarea>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<h5 className="contacts_header">Contacts</h5>
					</div>
					<div className="field" style={{marginTop: '30px'}}>
						<div className="col-md-3">
						  <div className="form-group">
						    <div className="input-group">
						      <div className="input-group-addon">VK</div>
						      <input type="text" className="form-control-bootstrap" style={{borderRadius: '0 4px 4px 0'}} id="exampleInputAmount" placeholder="VKontakte" />
						    </div>
						  </div>
						</div>
						<div className="col-md-3">
						  <div className="form-group">
						    <div className="input-group">
						      <div className="input-group-addon">F</div>
						      <input type="text" className="form-control-bootstrap" style={{borderRadius: '0 4px 4px 0'}} id="exampleInputAmount" placeholder="Facebook" />
						    </div>
						  </div>
						</div>
						<div className="col-md-3">
						  <div className="form-group">
						    <div className="input-group">
						      <div className="input-group-addon">S</div>
						      <input type="text" className="form-control-bootstrap" style={{borderRadius: '0 4px 4px 0'}} id="exampleInputAmount" placeholder="Skype" />
						    </div>
						  </div>
						</div>
						<div className="col-md-3">
						  <div className="form-group">
						    <div className="input-group">
						      <div className="input-group-addon">E</div>
						      <input type="text" className="form-control-bootstrap" style={{borderRadius: '0 4px 4px 0'}} id="exampleInputAmount" placeholder="E-mail" />
						    </div>
						  </div>
						</div>
					</div>
				</div>
				<div className="row" style={{marginTop: '20px'}}>
					<div className="col-md-12 field text-center">
						<button type="button" className="btn btn-success btn-lg" style={{minWidth: '280px'}}>Submit</button>
					</div>
				</div>
			</div>
		</div>
	}
});

var EditLanguages = React.createClass({
	render: function render() {
		return <div>Edit langs
		</div>
	}
});

var Profile = React.createClass({

	getInitialState: function getInitialState() {
		//TODO change from profile
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
			{this.state.editblock == 0 && <EditInformation />}
			{this.state.editblock == 1 && <EditLanguages />}
			<Footer messages={this.state.messages} />
		</div>
	}
})

module.exports = Profile;