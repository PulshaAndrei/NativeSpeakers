var host = "ec2-52-30-233-144.eu-west-1.compute.amazonaws.com";
//var host = "localhost"

var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;
var Select = require('react-select');
var MenuDashboard = require('./elements/MenuDashboard');
var Footer = require('./elements/Footer');
var LanguagesList = require('./localization/LanguagesList');
var Loading = require('react-loading');
var moment = require('moment');
import messages from './localization/messages';
import { browserHistory } from 'react-router';
import AlertContainer from 'react-alert';

var HeaderProfile = React.createClass({
	render: function render() {
		return <header className="header-profile">
			<div className="imageProfileHeaderBlock">
				<img className="imageProfileHeader" src={this.props.profile && this.props.profile.photo_link ? this.props.profile.photo_link :
					(this.props.profile && this.props.profile.gender == "female" ? "image/female_icon.png" : "image/male_icon.png")} />
			</div>
			<h2 className="labelProfileHeader">{this.props.profile ? this.props.profile.given_name+" "+this.props.profile.family_name : ""}</h2>
		</header>
	}
});

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

var Information = React.createClass({
	mixins: [IntlMixin],
	render: function render() {
		return <div className="editblock">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h5 className="contacts_header">{this.getIntlMessage('information')}</h5>
					</div>
					<div className="col-md-4">
						<div className="field">
							<div className="field-title">{this.getIntlMessage('given_name')}</div>
							<label>{this.props.profile.given_name}</label>
						</div>					
						<div className="field">
							<div className="field-title">{this.getIntlMessage('family_name')}</div>
							<label>{this.props.profile.family_name}</label>
						</div>
						<div className="field">
							<div className="field-title">{this.getIntlMessage('gender')}</div>
							<label>{this.getIntlMessage(this.props.profile.gender)}</label>
						</div>
						<div className="field">
							<div className="field-title">{this.getIntlMessage('birthday')}</div>
							<label>{moment(new Date(this.props.profile.birthday)).format("DD.MM.YYYY")}</label>
						</div>
					</div>
					<div className="col-md-4">
						<div className="field">
							<div className="field-title">{this.getIntlMessage('country')}</div>
							<label>{this.props.profile.country}</label>
						</div>
						<div className="field">
							<div className="field-title">{this.getIntlMessage('city')}</div>
							<label>{this.props.profile.city}</label>
						</div>
						<div className="field">
							<div className="field-title">{this.getIntlMessage('education')}</div>
							<label>{this.props.profile.education}</label>
						</div>
						<div className="field">
							<div className="field-title">{this.getIntlMessage('occupation')}</div>
							<label>{this.props.profile.occupation}</label>
						</div>
					</div>
					<div className="col-md-4">
						<div className="field">
							<div className="field-title">{this.getIntlMessage('about_self')}</div>
							<label>{this.props.profile.about_me}</label>
						</div>	
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<h5 className="contacts_header">{this.getIntlMessage('contacts')}</h5>
					</div>
					<div className="field" style={{marginTop: '30px'}}>
						<div className="col-md-3">
						  <div className="form-group">
						    <div className="input-group">
						      <div className="input-group-addon">VK</div>
						      <input type="text" disabled="disabled" className="form-control-bootstrap" style={{borderRadius: '0 4px 4px 0'}} id="exampleInputAmount" placeholder="VKontakte" value={this.props.profile.contactsVkontakte}/>
						    </div>
						  </div>
						</div>
						<div className="col-md-3">
						  <div className="form-group">
						    <div className="input-group">
						      <div className="input-group-addon">F</div>
						      <input type="text" disabled="disabled" className="form-control-bootstrap" style={{borderRadius: '0 4px 4px 0'}} id="exampleInputAmount" placeholder="Facebook" value={this.props.profile.contactsFacebook}/>
						    </div>
						  </div>
						</div>
						<div className="col-md-3">
						  <div className="form-group">
						    <div className="input-group">
						      <div className="input-group-addon">S</div>
						      <input type="text" disabled="disabled" className="form-control-bootstrap" style={{borderRadius: '0 4px 4px 0'}} id="exampleInputAmount" placeholder="Skype" value={this.props.profile.contactsSkype}/>
						    </div>
						  </div>
						</div>
						<div className="col-md-3">
						  <div className="form-group">
						    <div className="input-group">
						      <div className="input-group-addon">E</div>
						      <input type="text" disabled="disabled" className="form-control-bootstrap" style={{borderRadius: '0 4px 4px 0'}} id="exampleInputAmount" placeholder="E-mail" value={this.props.profile.contactsEmail}/>
						    </div>
						  </div>
						</div>
					</div>
				</div>
			</div>
		</div>
	}
});

var Languages = React.createClass({
	mixins: [IntlMixin],
	render: function render() {
		var langs = [];
		this.props.profile.student_languages.forEach(function(el){
			langs.push({
				language: el.language,
				student: true,
				teacher: false,
				level: el.level
			})
		});
		this.props.profile.teacher_languages.forEach(function(el){
			var newLang = true;
			for (var i=0; i<langs.length; i++){
				if (langs[i].language == el.language) {
					newLang = false;
					langs[i].teacher = true;
				}
			}
			if (newLang)
				langs.push({
					language: el.language,
					student: false,
					teacher: true,
					level: el.level
				})
		});
		var self = this;
		var langs_list = langs.map(function(el, i){
			var labl = LanguagesList[langs[i].language];
			return <div className="row languageBlock addLanguageBlock" key={"lang"+i}>
					<div className="col-md-11"><h2>{labl.name + " (" + labl.nativeName + ")"}</h2></div>
					<div className="col-md-4">
						<div className="checkbox">
						  <label>
						    <input type="checkbox" checked={langs[i].student}/>
						    {self.getIntlMessage('i_want_to_learn_language')}
						  </label>
						</div>
						<div className="checkbox">
						  <label>
						    <input type="checkbox" checked={langs[i].teacher}/>
						    {self.getIntlMessage('i_can_help_you_learn_the_language')}
						  </label>
						</div>
					</div>
					<div className="col-md-8">
						<div className="field-title">{self.getIntlMessage('language_proficiency_level')}</div>
						<div className="btn-group btn-block display-only"  data-toggle="buttons">
							<label className={"btn btn-secondary" + (langs[i].level == 0 ? " active" : "")} disabled={langs[i].level != 0}>
								<input type="radio" name="options" id="option1" autoComplete="off" /> A1
							</label>
							<label className={"btn btn-secondary" + (langs[i].level == 1 ? " active" : "")} disabled={langs[i].level != 1}>
								<input type="radio" name="options" id="option2" autoComplete="off" /> A2
							</label>
							<label className={"btn btn-secondary" + (langs[i].level == 2 ? " active" : "")} disabled={langs[i].level != 2}>
								<input type="radio" name="options" id="option2" autoComplete="off" /> B1
							</label>
							<label className={"btn btn-secondary" + (langs[i].level == 3 ? " active" : "")} disabled={langs[i].level != 3}>
								<input type="radio" name="options" id="option1" autoComplete="off" /> B2
							</label>
							<label className={"btn btn-secondary" + (langs[i].level == 4 ? " active" : "")} disabled={langs[i].level != 4}>
								<input type="radio" name="options" id="option2" autoComplete="off" /> C1
							</label>
							<label className={"btn btn-secondary" + (langs[i].level == 5 ? " active" : "")} disabled={langs[i].level != 5}>
								<input type="radio" name="options" id="option2" autoComplete="off" /> C2
							</label>
							<label className={"btn btn-secondary" + (langs[i].level == 6 ? " active" : "")} disabled={langs[i].level != 6}>
								<input type="radio" name="options" id="option2" autoComplete="off" /> {self.getIntlMessage('native_language')}
							</label>
						</div>
					</div>
				</div>
		});
		return <div className="editblock">
			<div className="container">
				{langs_list}
			</div>
		</div>
	}
});

var User = React.createClass({

	getInitialState: function getInitialState() {
		var locale = navigator.language.split('-')
		locale = localStorage.getItem('userLocale') ? localStorage.getItem('userLocale') 
			: (locale[0] ? locale[0] : 'en')
		var strings = messages[locale] ? messages[locale] : messages['en']

		return {
			currentLocale: locale,
			messages: strings,
			editblock: 0,
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
		var self = this;
		$.ajax({
			url: 'http://'+host+'/secured/user?user_id='+this.props.location.query.id,
			method: 'GET'
		}).then(function (data, textStatus, jqXHR) {
			this.setState({ profile: data });
		}.bind(this), function (err) {
			self.showAlertError(err.statusText);
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
				profile={this.state.profile} />
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
						<Information 
							messages={this.state.messages} 
							profile={this.state.profile}
							submitGeneralInfo={this.submitGeneralInfo} />}
					{this.state.editblock == 1 && 
						<Languages 
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

module.exports = User;