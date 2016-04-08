var host = "ec2-52-48-222-111.eu-west-1.compute.amazonaws.com";
//var host = "localhost"

var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;
var Select = require('react-select');
var MenuDashboard = require('./../elements/MenuDashboard');
var Footer = require('./../elements/Footer');
var LanguagesList = require('./../localization/LanguagesList');
var Loading = require('react-loading');
import messages from './../localization/messages';
import { browserHistory } from 'react-router'

var Header = React.createClass({
	mixins: [IntlMixin],
	render: function render (){
		return <header style={{minHeight: '30%'}}>
		</header>
	}
});

var Search = React.createClass({
	mixins: [IntlMixin],
	getInitialState: function getInitialState(){
		return {
			lang: null
		}
	},
	langChange: function langChange(e){
		this.setState({
			lang: e.value
		})
	},
	changeGender: function changeGender(){

	},
	render: function render (){
		var options = LanguagesList.map(function(el, i) {
			return {value: i, label: el.name + " (" + el.nativeName + ")"}
		});
		return <div className="container-fluid">
			<div className="row">
				<div className="col-md-4 parametrsSearch">
					<h2>Поиск людей</h2>
					<div>
						<div className="field-title">Язык, который хотите изучить</div>
						<Select
							    value={this.state.lang}
							    placeholder={this.getIntlMessage('choose_language_please')}
							    noResultsText={this.getIntlMessage('no_results_found')}
							    options={options}
							    clearable={false}
							    backspaceRemoves={false}
							    autosize={true}
							    onChange={this.langChange} />
					</div>
					<div>
						<div className="field-title">Язык, с которым можете помочь в изучении</div>
						<Select
							    value={this.state.lang}
							    placeholder={this.getIntlMessage('choose_language_please')}
							    noResultsText={this.getIntlMessage('no_results_found')}
							    options={options}
							    clearable={false}
							    backspaceRemoves={false}
							    autosize={true}
							    onChange={this.langChange} />
					</div>
					<div>
						<div className="field-title">Возраст</div>
						<label>от</label>
						<input className="form-control-bootstrap form-inline-bootstrap" type="number" />
						<label>до</label>
						<input className="form-control-bootstrap form-inline-bootstrap" type="number" />
					</div>
					<div>
							<div className="field-title">{this.getIntlMessage('gender')}</div>
							<div className="btn-group field-radio btn-group-justified" data-toggle="buttons">
							  <label className={"btn btn-secondary" + (this.state.gender == "male" ? " active" : "")} onClick={this.changeGender.bind(null,"male")}>
							    <input type="radio" name="options" id="option1" autoComplete="off" /> {this.getIntlMessage('male')}
							  </label>
							  <label className={"btn btn-secondary" + (this.state.gender == "female" ? " active" : "")} onClick={this.changeGender.bind(null,"female")}>
							    <input type="radio" name="options" id="option2" autoComplete="off" /> {this.getIntlMessage('female')}
							  </label>
							</div>
					</div>
					<div>
						<div className="field-title">Cтрана</div>
						<input className="form-control-bootstrap" type="text" />
					</div>
					<div>
						<div className="field-title">Город</div>
						<input className="form-control-bootstrap" type="text" />
					</div>
				</div>
				<div className="col-md-8" style={{paddingRight: 0, background: '#f9f9f9'}}>
					<Loading type='bubbles' color='#9C27B0' />
				</div>
			</div>
		</div>

	}
	/*<div className="row vertical-align" style={{margin: 0, height:'100%'}}>
						<div className="col-md-12" style={{height: '100%', padding: '0', background: '#f9f9f9'}}>
							<Loading type='bubbles' color='#9C27B0' />
						</div>
					</div>*/
});

var SearchPeople = React.createClass({

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
			<Search 
				messages={this.state.messages} />
			<Footer 
				messages={this.state.messages} />
		</div>
	}
})

module.exports = SearchPeople;