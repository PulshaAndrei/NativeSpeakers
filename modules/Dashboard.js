var host = "ec2-52-30-233-144.eu-west-1.compute.amazonaws.com";
//var host = "localhost"

var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;
var MenuDashboard = require('./elements/MenuDashboard');
var Footer = require('./elements/Footer');
var Video = require('react-h5-video');
import messages from './localization/messages';
import { browserHistory } from 'react-router'

var Header = React.createClass({
	mixins: [IntlMixin],
	render: function render (){
		return <header id="first">
			<div className="header-content">
				<div className="inner">
					<h1 className="cursive">Native Speakers</h1>
					<h4>"The limits of my language are the limits of my world." ‒ Ludwig Wittgenstein</h4>
					<br />
					<a className="btn btn-primary btn-xl header-link page-scroll" href="#two">{this.getIntlMessage('find_command')}</a>
					<span className="hidden-xs"> &nbsp;&nbsp;&nbsp; </span>
					<div className="visible-xs-block" style={{height: '25px'}}></div>
					<a className="btn btn-primary btn-xl header-link page-scroll" href="#three">{this.getIntlMessage('choose_language')}</a>
				</div>
			</div>
			<div className="hidden-xs">
				<Video sources={["video/Globe_SouthAmerica1_Videvo.mp4"]} autoPlay={true} constrols={false} width="100%" height="auto" loop={true}></Video>
			</div>
		</header>
	}
});

var PopularPeople = React.createClass({
	mixins: [IntlMixin],
	render() {
		var array = [
			{user_id: 'facebook|785087798288631', country_image:'image/belarus.jpg', given_name: "Андрей", family_name: 'Пульша', photo_link: 'https://s3-eu-west-1.amazonaws.com/nativespeakers/facebook|785087798288631'}, 
			{user_id: 'facebook|785087798288631', country_image:'image/russia.jpg', given_name: "Russia", family_name: '', photo_link: 'image/male_icon.png'}, 
			{user_id: 'facebook|785087798288631', country_image:'image/english.jpg', given_name: "English", family_name: '', photo_link: 'image/female_icon.png'}];
		var self = this;
		var users = array.map(function(el,i) {
			return <div className={"col-md-4 col-sm-6"+(i == 2 ? " hidden-sm" : "")} key={"usersDash"+i}>
						<div className="userTeam">
							<div>
								<img className="backgroundTeam" src={el.country_image}/>
								<div className="userImageTeam">
									<img src={el.photo_link ? el.photo_link : (el.gender == "female" ? "image/female_icon.png" : "image/male_icon.png")} />
								</div>
							</div>
							<div className="userInfoTeam">
								<h2>{el.given_name+" "+el.family_name}</h2>
								<a href={"#/user?id="+el.user_id} className="btn btn-blue-fill" style={{lineHeight: '34px'}}>{self.getIntlMessage('become_acquainted')}</a> 
							</div>
						</div>
					</div>;
		});

		return <section className="teamDashboard" id="two">
			<div className="container text-center">
				<h2 className="text-primary">{this.getIntlMessage('find_command')}</h2>
				<h4>{this.getIntlMessage('working_in_tandem_with_a_native_speaker_the_best_way_to_explore_it')}</h4>
				<br/>
				<a href={"#/search_people"} className="btn btn-blue-fill search_people_btn" style={{height: 'auto', minWidth: 'auto'}}>{self.getIntlMessage('search_people')}</a>
				<br/>
				<div className="row" style={{marginTop: '45px'}}>
					{users}
				</div>
			</div>
		</section>
	}
})

var PopularLanguages = React.createClass({
	mixins: [IntlMixin],
	render() {
		return <section id="three" className="no-padding" style={{background: '#282828'}}>
				<div className="container-fluid text-center">
					<div className="call-to-action chooseLanguage-header">
						<h2 className="text-primary">{this.getIntlMessage('choose_language')}</h2>
						<a href="#/search_people" className="btn btn-default btn-lg wow flipInX">{this.getIntlMessage('all_languages')}</a>
					</div>
					<br/>
					<hr/>
					<br/>
					<h4 className="wide-space text-center" style={{color: 'white'}}>{this.getIntlMessage('popular_languages')}</h4>
					<br/>
					<div className="row no-gutter">
						<div className="col-lg-4 col-md-4 col-sm-6">
							<a href="#/search_people?language=39" className="gallery-box" data-src="image/english.jpg">
								<img src="image/english.jpg" className="img-responsive" />
								<div className="gallery-box-caption">
									<div className="gallery-box-content">
										<div>{this.getIntlMessage('english')}</div>
									</div>
								</div>
							</a>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-6">
							<a href="#/search_people?language=50" className="gallery-box" data-src="image/germany.jpg">
								<img src="image/germany.jpg" className="img-responsive" />
								<div className="gallery-box-caption">
									<div className="gallery-box-content">
										<div>{this.getIntlMessage('german')}</div>
									</div>
								</div>
							</a>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-6">
							<a href="#/search_people?language=132" className="gallery-box" data-src="image/russia.jpg">
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

		setTimeout(function(){
			$('body').scrollspy({target:'.navbar-fixed-top',offset:60});
			$('#topNav').affix({offset:{top:50}});
			new WOW().init();
			$('a.page-scroll').bind('click',function(event){
				var link=$(this).attr('href');
				link=link=="#"?"#first":link;
				$('html, body').stop().animate({scrollTop:($(link).offset().top-60)},1450,'easeInOutExpo');
				event.preventDefault();
			});
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
			<PopularLanguages 
				messages={this.state.messages} />
			<Footer 
				messages={this.state.messages} />
		</div>
	}
})

module.exports = Dashboard;