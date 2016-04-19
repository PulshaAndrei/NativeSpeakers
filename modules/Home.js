var host = "ec2-52-30-233-144.eu-west-1.compute.amazonaws.com";
//var host = "localhost"

var React = require('react');
var Video = require('react-h5-video');
var IntlMixin = require('react-intl').IntlMixin;
var Footer = require('./elements/Footer');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
import messages from './localization/messages';
import { browserHistory } from 'react-router';
import AlertContainer from 'react-alert';

var HomeNavigation = React.createClass({
	mixins: [IntlMixin],
	render() {
		var self = this;
		var setCurrentLocale = function(locale) {
			self.props.setCurrentLocale(locale)
		}
		var listLocales = this.props.supportedLocales.map(function(locale){
			return <a className={self.props.currentLocale == locale.shortName ? "currentLanguage" : ""} href="#" key={locale.shortName} onClick={setCurrentLocale.bind(this, locale.shortName)}>{locale.shortName}</a>
		});
		var listLocalesMobile = this.props.supportedLocales.map(function(locale){
			return <a className={self.props.currentLocale == locale.shortName ? "currentLanguage currentLocaleMobile" : "currentLanguage"} href="#" key={locale.shortName} onClick={setCurrentLocale.bind(this, locale.shortName)}>{locale.shortName}</a>
		});
		/*						<li>
							<a className="page-scroll" href="#three">{this.getIntlMessage('choose_language')}</a>
						</li>
*/

		return <nav id="topNav" className="navbar navbar-default navbar-fixed-top">
			<div className="container-fluid">
				<div className="navbar-header">
					<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
					<a className="navbar-brand roll page-scroll" href="#first"><div className="logotype"></div><span> Native Speakers</span></a>
				</div>
				<div className="navbar-collapse collapse" id="bs-navbar">
					<ul className="nav navbar-nav">
						<li>
							<a className="page-scroll" href="#two">{this.getIntlMessage('about_project')}</a>
						</li>
						<li>
							<a className="page-scroll" href="#last">{this.getIntlMessage('contact_us')}</a>
						</li>
					</ul>
					<ul className="nav navbar-nav navbar-right">
						<li className="listLocales hidden-xs">{listLocales}</li>
						<li className="listLocales visible-xs-inline-block">{listLocalesMobile}</li>
					</ul>
				</div>
			</div>
		</nav>
	}
})

var Header = React.createClass({
	mixins: [IntlMixin],
	goToDashboard: function goToDashboard() {
		window.location = "./#/dashboard"
	},

	showLock: function showLock() {	
		var self = this;
		this.props.lock.show({
			dict: this.props.currentLocale,
			icon: 'image/logo.png',
			primaryColor: '#9C27B0'
		}, function (err, profile, token) {
			console.log(err, profile, token)
			if (!err) {
				localStorage.setItem('userToken', token);
				$.ajax({
					url: 'http://'+host+'/login',
					method: 'POST',
					data: profile
				}).then(function (data, textStatus, jqXHR) {
					self.goToDashboard();
				}, function (err) {
					console.log(err);
				});
			}			
		});
	},
	render() {
		return <header id="first">
			<div className="header-content">
				<div className="inner">
					<h1 className="cursive">Native Speakers</h1>
					<h4>"The limits of my language are the limits of my world." ‒ Ludwig Wittgenstein</h4>
					<hr />
					<a onClick={this.showLock} className="btn btn-primary btn-xl header-link" id="login">{this.getIntlMessage('join')}</a>
				</div>
			</div>
			<div className="hidden-xs">
				<Video sources={["video/Globe_SouthAmerica1_Videvo.mp4"]} autoPlay={true} constrols={false} width="100%" height="auto" loop={true}></Video>
			</div>
			</header>
	}
})

var About = React.createClass({
	render() {
		return <section id="two">
			</section>
	}
})

var PopularLanguages = React.createClass({
	mixins: [IntlMixin],
	render() {
		return <section id="three" className="no-padding">
				<div className="container-fluid text-center">
					<div className="call-to-action chooseLanguage-header">
						<h2 className="text-primary">{this.getIntlMessage('choose_language')}</h2>
						<a href="#" className="btn btn-default btn-lg wow flipInX">{this.getIntlMessage('all_languages')}</a>
					</div>
					<br/>
					<hr/>
					<br/>
					<h4 className="wide-space text-center">{this.getIntlMessage('popular_languages')}</h4>
					<br/>
					<div className="row no-gutter">
						<div className="col-lg-4 col-md-4 col-sm-6">
							<a href="#" className="gallery-box" data-src="image/english.jpg">
								<img src="image/english.jpg" className="img-responsive" />
								<div className="gallery-box-caption">
									<div className="gallery-box-content">
										<div>{this.getIntlMessage('english')}</div>
									</div>
								</div>
							</a>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-6">
							<a href="#" className="gallery-box" data-src="image/germany.jpg">
								<img src="image/germany.jpg" className="img-responsive" />
								<div className="gallery-box-caption">
									<div className="gallery-box-content">
										<div>{this.getIntlMessage('german')}</div>
									</div>
								</div>
							</a>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-6">
							<a href="#" className="gallery-box" data-src="image/russia.jpg">
								<img src="image/russia.jpg" className="img-responsive" />
								<div className="gallery-box-caption">
									<div className="gallery-box-content">
										<div>{this.getIntlMessage('russian')}</div>
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</section>
	}
})

var ContactUs = React.createClass({
	mixins: [LinkedStateMixin, IntlMixin],
	getInitialState: function getInitialState() {
		return {
			name: null,
			email: null,
			phone_number: null,
			message: null
		}
	},
	send: function send(){
		console.log(this.state);
		this.setState({
			name: null,
			email: null,
			phone_number: null,
			message: null
		});
		var self= this;
		$.ajax({
			url: 'http://'+host+'/contact_us',
			method: 'POST',
			data: this.state
		}).then(function (data, textStatus, jqXHR) {
			this.showAlertSuccess()
		}, function (err) {
			self.showAlertError(err.statusText)
		});
	},
	showAlertSuccess(){
	    this.msg.show(this.getIntlMessage('thank_you_for_your_message'), {
	      time: 10000,
	      type: 'success',
	      icon: <img src="image/icon_success.png" />
	    });
	},
	showAlertError(err){
	    this.msg.show(this.getIntlMessage('error')+': '+err, {
	      time: 2000,
	      type: 'error',
	      icon: <img src="image/icon_error.png" />
	    });
	},
	render() {
		return <section id="last">
			<div className="container">
				<div className="row">
					<div className="col-lg-8 col-lg-offset-2 text-center">
						<h2 className="margin-top-0 wow fadeIn">{this.getIntlMessage('contact_us')}</h2>
						<hr className="primary"/>
						<p>{this.getIntlMessage('contact_us_details')}</p>
					</div>
					<div className="col-lg-10 col-lg-offset-1 text-center">
						<form className="contact-form row">
							<div className="col-md-4">
								<label></label>
								<input type="text" className="form-control" placeholder={this.getIntlMessage('name')} valueLink={this.linkState('name')}/>
							</div>
							<div className="col-md-4">
								<label></label>
								<input type="email" className="form-control" placeholder="Email"  valueLink={this.linkState('email')}/>
							</div>
							<div className="col-md-4">
								<label></label>
								<input type="text" className="form-control" placeholder={this.getIntlMessage('phone_number')}  valueLink={this.linkState('phone_number')}/>
							</div>
							<div className="col-md-12">
								<label></label>
								<textarea className="form-control" rows="9" placeholder={this.getIntlMessage('your_message')} valueLink={this.linkState('message')}></textarea>
							</div>
							<div className="col-md-4 col-md-offset-4">
								<label></label>
								<button type="button" data-toggle="modal" data-target="#alertModal" className="btn btn-primary btn-block btn-lg" onClick={this.send}><span>{this.getIntlMessage('send')}</span> <i className="ion-android-arrow-forward"></i></button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<AlertContainer 
				ref={a => this.msg = a} 
				offset={0}
				position='bottom left'
				theme='dark'      
				time={5000}
				transition='scale' />
		</section>
	}
})

var Home = React.createClass({
	getInitialState: function getInitialState() {
		var locale = navigator.language.split('-')
		locale = localStorage.getItem('userLocale') ? localStorage.getItem('userLocale') 
			: locale[1] ? `${locale[0]}-${locale[1].toUpperCase()}` : navigator.language
		var strings = messages[locale] ? messages[locale] : messages['en']

		return {
			currentLocale: locale,
			messages: strings
		};
	},
	setCurrentLocale: function setCurrentLocale(locale) {
		this.state.currentLocale = locale
		localStorage.setItem('userLocale', locale);
		var strings = messages[locale] ? messages[locale] : messages['en']
		this.state.messages = strings
	},
	render() {
		/*<PopularLanguages messages={this.state.messages} />*/
		return <div style={{backgroundColor:'#282828'}} className="bodyHome">
			<HomeNavigation  
				messages={this.state.messages} 
				currentLocale={this.state.currentLocale} 
				supportedLocales={messages.supportLanguages}
				setCurrentLocale={this.setCurrentLocale}/>
			<Header 
				lock={this.props.lock} 
				messages={this.state.messages} 
				currentLocale={this.state.currentLocale}/>
			<About messages={this.state.messages} />			
			<ContactUs messages={this.state.messages} />
			<Footer messages={this.state.messages} />
		</div>
  }
})

module.exports = Home;
