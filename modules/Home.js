var React = require('react');
var Video = require('react-h5-video');
var IntlMixin = require('react-intl').IntlMixin;
import messages from './messages';
import { browserHistory } from 'react-router';

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
							<a className="page-scroll" href="#three">{this.getIntlMessage('choose_language')}</a>
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
		window.location = "./"
	},

	showLock: function showLock() {
		var serverName = "ec2-52-50-43-215.eu-west-1.compute.amazonaws.com";
		//var serverName = "localhost";
		
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
					url: 'http://'+serverName+'/login',
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
			<Video sources={["video/Globe_SouthAmerica1_Videvo.mp4"]} autoPlay={true} constrols={false} width="100%" height="auto" loop={true}></Video>
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
	mixins: [IntlMixin],
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
								<input type="text" className="form-control" placeholder={this.getIntlMessage('name')} />
							</div>
							<div className="col-md-4">
								<label></label>
								<input type="text" className="form-control" placeholder="Email" />
							</div>
							<div className="col-md-4">
								<label></label>
								<input type="text" className="form-control" placeholder={this.getIntlMessage('phone_number')} />
							</div>
							<div className="col-md-12">
								<label></label>
								<textarea className="form-control" rows="9" placeholder={this.getIntlMessage('your_message')}></textarea>
							</div>
							<div className="col-md-4 col-md-offset-4">
								<label></label>
								<button type="button" data-toggle="modal" data-target="#alertModal" className="btn btn-primary btn-block btn-lg"><span>{this.getIntlMessage('send')}</span> <i className="ion-android-arrow-forward"></i></button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	}
})

var Footer = React.createClass({
	mixins: [IntlMixin],
	render() {
		return <footer id="footer">
				<div className="container-fluid">
					<div className="row">
						<div className="col-xs-6 col-sm-3 column">
							<h4>{this.getIntlMessage('info')}</h4>
							<ul className="list-unstyled">
								<li><a href="#">{this.getIntlMessage('products')}</a></li>
								<li><a href="#">{this.getIntlMessage('services')}</a></li>
								<li><a href="#">{this.getIntlMessage('benefits')}</a></li>
								<li><a href="#">{this.getIntlMessage('developers')}</a></li>
							</ul>
						</div>
						<div className="col-xs-6 col-sm-3 column">
							<h4>{this.getIntlMessage('about_us')}</h4>
							<ul className="list-unstyled">
								<li><a href="#">{this.getIntlMessage('contact_us')}</a></li>
								<li><a href="#">{this.getIntlMessage('delivery_information')}</a></li>
								<li><a href="#">{this.getIntlMessage('privacy_policy')}</a></li>
								<li><a href="#">{this.getIntlMessage('terms_conditions')}</a></li>
							</ul>
						</div>
						<div className="col-xs-12 col-sm-3 column">
							<h4>{this.getIntlMessage('news')}</h4>
							<form>
								<div className="form-group">
								  <input type="text" className="form-control" title={this.getIntlMessage('no_spam')} placeholder={this.getIntlMessage('your_email')}/>
								</div>
								<div className="form-group">
								  <button className="btn btn-primary" data-toggle="modal" data-target="#alertModal" type="button">{this.getIntlMessage('subscribe_updates')}</button>
								</div>
							</form>
						</div>
						<div className="col-xs-12 col-sm-3 text-right">
							<h4>{this.getIntlMessage('social')}</h4>
							<ul className="list-inline">
							  <li><a rel="nofollow" href="" title="Twitter"><i className="icon-lg ion-social-twitter-outline"></i></a>&nbsp;</li>
							  <li><a rel="nofollow" href="" title="Facebook"><i className="icon-lg ion-social-facebook-outline"></i></a>&nbsp;</li>
							  <li><a rel="nofollow" href="" title="Dribble"><i className="icon-lg ion-social-dribbble-outline"></i></a></li>
							</ul>
						</div>
					</div>
					<br/>
					<span className="pull-right text-muted small">©2015 - 2016 Native Speakers</span>
				</div>
			</footer>
	}
})

var Home = React.createClass({
	getInitialState: function getInitialState() {
		var locale = navigator.language.split('-')
		locale = locale[1] ? `${locale[0]}-${locale[1].toUpperCase()}` : navigator.language
		locale ='en'
		var strings = messages[locale] ? messages[locale] : messages['en']  
		//strings = Object.assign(messages['en'], strings);

		return {
			currentLocale: locale,
			messages: strings
		};
	},
	setCurrentLocale: function setCurrentLocale(locale) {
		this.state.currentLocale = locale
		var strings = messages[locale] ? messages[locale] : messages['en']  
		//strings = Object.assign(messages['en'], strings);
		this.state.messages = strings
	},
	render() {
		return <div>
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
			<PopularLanguages messages={this.state.messages} />
			<ContactUs messages={this.state.messages} />
			<Footer messages={this.state.messages} />
		</div>
  }
})

module.exports = Home;
