var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;

var MenuDashboard = React.createClass({
	mixins: [IntlMixin],
	/*<a href="#events">{this.getIntlMessage('events')}</a>*/
	render: function render() {
		var self = this;
		var setCurrentLocale = function(locale) {
			self.props.setCurrentLocale(locale)
		}
		var listLocales = this.props.supportedLocales.map(function(locale){
			return <a style={{cursor: 'pointer'}} className={self.props.currentLocale == locale.shortName ? "currentLanguage" : ""} key={locale.shortName} onClick={setCurrentLocale.bind(this, locale.shortName)}>{locale.shortName}</a>
		});
		var listLocalesMobile = this.props.supportedLocales.map(function(locale){
			return <a style={{cursor: 'pointer'}} className={self.props.currentLocale == locale.shortName ? "currentLanguage currentLocaleMobile" : "currentLanguage"} key={locale.shortName} onClick={setCurrentLocale.bind(this, locale.shortName)}>{locale.shortName}</a>
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
					<a className="navbar-brand roll" href="#dashboard"><div className="logotype"></div><span> Native Speakers</span></a>
				</div>
				<div className="navbar-collapse collapse" id="bs-navbar">
					<ul className="nav navbar-nav">
						<li>
							<a href="#profile">{this.getIntlMessage('profile')}</a>
						</li>
						<li>
							<a href="#search_people">{this.getIntlMessage('search_people')}</a>
						</li>
						<li>
							<a href="#">{this.getIntlMessage('events')}</a>
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

module.exports = MenuDashboard;