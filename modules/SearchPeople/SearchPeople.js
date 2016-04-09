//var host = "ec2-52-48-222-111.eu-west-1.compute.amazonaws.com";
var host = "localhost"

var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;
var Select = require('react-select');
var MenuDashboard = require('./../elements/MenuDashboard');
var Footer = require('./../elements/Footer');
var LanguagesList = require('./../localization/LanguagesList');
var Loading = require('react-loading');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
import messages from './../localization/messages';
import { browserHistory } from 'react-router'
import Pagination from "react-js-pagination";

var Header = React.createClass({
	mixins: [IntlMixin],
	render: function render (){
		return <header style={{minHeight: '30%'}}>
		</header>
	}
});

var SearchResults = React.createClass({
	mixins: [LinkedStateMixin, IntlMixin],
	getInitialState: function getInitialState(){
		return {
			activePage: 1
		}
	},
	onChangePage: function onChangePage(pageNumber) {
		this.setState({activePage: pageNumber});
	},
	render: function render(){
		var self = this;
		var list = this.props.results.map(function(el, i) {
			var stud_lang = "";
			var teach_lang = "";
			el.student_languages.forEach(function(el, i) {stud_lang += (i == 0 ? "" : ", ") + LanguagesList[el.language].nativeName });
			el.teacher_languages.forEach(function(el, i) {teach_lang += (i == 0 ? "" : ", ") + LanguagesList[el.language].nativeName });
			if (i>=(self.state.activePage-1)*3 && i<=self.state.activePage*3-1)
			return <div className="row listPeople" key={"listpeople"+i}>
				<div className="col-md-3" className="imageSearchPeople">
					<a href={"#user?id="+el.user_id} className="hrefTouser">
						<img src={(el.gender == "female" ? "image/female_icon.png" : "image/male_icon.png")} />
					</a>
				</div>
				<div>
					<a href={"#user?id="+el.user_id} className="hrefTouser"><h2>{el.given_name + " " + el.family_name}</h2></a>
					<p style={{marginBottom: '5px'}}><b>{self.getIntlMessage('studying_languages')+": "}</b> {stud_lang}</p>
					<p><b>{self.getIntlMessage('fluenting_languages')+"; "}</b> {teach_lang}</p>
				</div>
			</div>
		});
		return <div>
			{list}
			{this.props.results.length > 3 && 
				<div className="text-center">
					<Pagination 
			          activePage={this.state.activePage}
			          totalItemsCount={this.props.results.length} 
			          itemsCountPerPage={3}
			          onChange={this.onChangePage.bind(this)} />
			    </div>}
		</div>
	}
});

var Search = React.createClass({
	mixins: [LinkedStateMixin, IntlMixin],
	getInitialState: function getInitialState(){
		return {
			lang: null,
			gender: null,
			age_from: null,
			age_to: null,
			country: null,
			city: null,
			results: null,
			loading: false,
			no_result: false
		}
	},
	componentWillMount: function componentWillMount(){
		this.submit();
	},
	langChange: function langChange(e){
		this.setState({ lang: e.value })
	},
	changeGender: function changeGender(gender){
		this.setState({ gender: gender });
	},
	submit: function submit(){
		this.setState({ loading: true });
		$.ajax({
			url: 'http://'+host+'/secured/users?gender='+(this.state.gender ? this.state.gender : "") 
				+'&age_from='+(this.state.age_from ? this.state.age_from : "")
				+'&age_to='+(this.state.age_to ? this.state.age_to : "")
				+'&country='+(this.state.country ? this.state.country : "")
				+'&city='+(this.state.city ? this.state.city : "")
				+'&teacher_for='+(this.state.lang ? this.state.lang : ""),
			method: 'GET'
		}).then(function (data, textStatus, jqXHR) {
			console.log(data);
			this.setState({ 
				loading: false, 
				no_result: data.length == 0,
				results: data
			});
		}.bind(this), function () {
			alert("Server error!");
		});
	},
	render: function render (){
		var options = LanguagesList.map(function(el, i) {
			return {value: i, label: el.name + " (" + el.nativeName + ")"}
		});
		return <div className="container-fluid">
			<div className="row">
				<div className="col-md-4 parametrsSearch" style={{zIndex: 1}}>
					<h2>{this.getIntlMessage('search_people')}</h2>
					<div>
						<div className="field-title">{this.getIntlMessage('language')}</div>
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
						<div className="field-title">{this.getIntlMessage('age')}</div>
						<label style={{color: '#999', marginRight: '10px'}}>{this.getIntlMessage('from')}</label>
						<input className="form-control-bootstrap form-inline-bootstrap" type="number" valueLink={this.linkState('age_from')}/>
						<label style={{color: '#999', marginLeft: '10px', marginRight: '10px'}}>{this.getIntlMessage('to')}</label>
						<input className="form-control-bootstrap form-inline-bootstrap" type="number" valueLink={this.linkState('age_to')}/>
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
							  <label className={"btn btn-secondary" + (this.state.gender == null ? " active" : "")} onClick={this.changeGender.bind(null,null)}>
							    <input type="radio" name="options" id="option2" autoComplete="off" /> {this.getIntlMessage('does_not_matter')}
							  </label>
							</div>
					</div>
					<div>
						<div className="field-title">{this.getIntlMessage('country')}</div>
						<input className="form-control-bootstrap" type="text" valueLink={this.linkState('country')}/>
					</div>
					<div>
						<div className="field-title">{this.getIntlMessage('city')}</div>
						<input className="form-control-bootstrap" type="text" valueLink={this.linkState('city')}/>
					</div>
					<div className="text-center">
						<button type="button" className="btn btn-success btn-lg" style={{minWidth: '280px', marginTop: '10px'}} onClick={this.submit}>{this.getIntlMessage('search')}</button>
					</div>
				</div>
				{this.state.loading && 
					<div className="col-md-8" style={{paddingRight: 0, background: '#f9f9f9'}}>
						<div className="row vertical-align" style={{margin: 0, position:'relative'}}>
							<div className="col-md-12" style={{minHeight: '80%', padding: '0'}}>
								<Loading type='bubbles' color='#9C27B0' />
							</div>
						</div>
					</div>}
				{this.state.no_result && 
					<div className="col-md-8" style={{paddingRight: 0, background: '#f9f9f9'}}>
						<div className="row vertical-align" style={{margin: 0, position:'relative'}}>
							<div className="col-md-12" style={{minHeight: '80%', padding: '0'}}>
								<h4>{this.getIntlMessage('no_results_found')}</h4>
							</div>
						</div>
					</div>}
				{this.state.results && this.state.results.length>0 &&
					<div className="col-md-8" style={{background: '#f9f9f9'}}>
						<div style={{padding: '50px 70px'}}>
							<SearchResults 
								messages={this.state.messages} 
								results={this.state.results} />
						</div>
					</div>}
			</div>
		</div>
	}
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

	render: function render() {
		return <div className="searchPeoplePage">
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