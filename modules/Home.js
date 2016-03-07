var React = require('react');
var Video = require('react-h5-video');

var HomeNavigation = React.createClass({
	render() {
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
							<a className="page-scroll" href="#two" data-l10n-id="about">О проекте</a>
						</li>
						<li>
							<a className="page-scroll" href="#three" data-l10n-id="chooseLanguage">Выбрать язык</a>
						</li>
						<li>
							<a className="page-scroll" href="#last" data-l10n-id="contactUs">Связаться с нами</a>
						</li>
					</ul>
					<ul className="nav navbar-nav navbar-right">
						<li className="listLocales">
							<a className="page-scroll" href="#" id="enLanguage" onclick="changeLanguage('en')">EN</a>
							<a className="page-scroll" href="#" id="deLanguage"onclick="changeLanguage('de')">DE</a>
							<a className="page-scroll currentLanguage" href="#" id="ruLanguage" onclick="changeLanguage('ru')">RU</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	}
})

var Header = React.createClass({
	showLock: function showLock() {
		this.props.lock.show({
			icon: 'image/logo.png',
			primaryColor: '#9C27B0'
		});
	},
	render() {
		return <header id="first">
			<div className="header-content">
				<div className="inner">
					<h1 className="cursive">Native Speakers</h1>
					<h4 data-l10n-id="slogan">"The limits of my language are the limits of my world." ‒ Ludwig Wittgenstein</h4>
					<hr />
					<a onClick={this.showLock} className="btn btn-primary btn-xl header-link" id="login" data-l10n-id="logIn">Войти или зарегистрироваться</a>
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
	render() {
		return <section id="three" className="no-padding">
				<div className="container-fluid text-center">
					<div className="call-to-action chooseLanguage-header">
						<h2 className="text-primary" data-l10n-id="chooseLanguage">Выбрать язык</h2>
						<a href="#" className="btn btn-default btn-lg wow flipInX"  data-l10n-id="allLanguages">Все языки</a>
					</div>
					<br/>
					<hr/>
					<br/>
					<h4 className="wide-space text-center"  data-l10n-id="popularLanguages">ПОПУЛЯРНЫЕ ЯЗЫКИ</h4>
					<br/>
					<div className="row no-gutter">
						<div className="col-lg-4 col-md-4 col-sm-6">
							<a href="#" className="gallery-box" data-src="image/english.jpg">
								<img src="image/english.jpg" className="img-responsive" />
								<div className="gallery-box-caption">
									<div className="gallery-box-content">
										<div  data-l10n-id="english">Английский</div>
									</div>
								</div>
							</a>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-6">
							<a href="#" className="gallery-box" data-src="image/germany.jpg">
								<img src="image/germany.jpg" className="img-responsive" />
								<div className="gallery-box-caption">
									<div className="gallery-box-content">
										<div  data-l10n-id="german">Немецкий</div>
									</div>
								</div>
							</a>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-6">
							<a href="#" className="gallery-box" data-src="image/russia.jpg">
								<img src="image/russia.jpg" className="img-responsive" />
								<div className="gallery-box-caption">
									<div className="gallery-box-content">
										<div  data-l10n-id="russian">Русский</div>
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
	render() {
		return <section id="last">
			<div className="container">
				<div className="row">
					<div className="col-lg-8 col-lg-offset-2 text-center">
						<h2 className="margin-top-0 wow fadeIn"  data-l10n-id="contactUs">Связаться с нами</h2>
						<hr className="primary"/>
						<p  data-l10n-id="contactUsDetails">Мы любим обратную связь. Напишите нам Ваши пожелания.</p>
					</div>
					<div className="col-lg-10 col-lg-offset-1 text-center">
						<form className="contact-form row">
							<div className="col-md-4">
								<label></label>
								<input type="text" className="form-control" data-l10n-id="name" placeholder="Имя" />
							</div>
							<div className="col-md-4">
								<label></label>
								<input type="text" className="form-control" placeholder="Email" />
							</div>
							<div className="col-md-4">
								<label></label>
								<input type="text" className="form-control" data-l10n-id="phoneNumber" placeholder="Номер телефона" />
							</div>
							<div className="col-md-12">
								<label></label>
								<textarea className="form-control" rows="9" data-l10n-id="yourMessage" placeholder="Ваше сообщение..."></textarea>
							</div>
							<div className="col-md-4 col-md-offset-4">
								<label></label>
								<button type="button" data-toggle="modal" data-target="#alertModal" className="btn btn-primary btn-block btn-lg"><span  data-l10n-id="send">Отправить</span> <i className="ion-android-arrow-forward"></i></button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	}
})

var Footer = React.createClass({
	render() {
		return <footer id="footer">
				<div className="container-fluid">
					<div className="row">
						<div className="col-xs-6 col-sm-3 column">
							<h4  data-l10n-id="info">Информация</h4>
							<ul className="list-unstyled">
								<li><a href="#" data-l10n-id="products">Продукты</a></li>
								<li><a href="#" data-l10n-id="services">Сервисы</a></li>
								<li><a href="#" data-l10n-id="benefits">Выгоды</a></li>
								<li><a href="#" data-l10n-id="developers">Разработчики</a></li>
							</ul>
						</div>
						<div className="col-xs-6 col-sm-3 column">
							<h4 data-l10n-id="aboutUs">О нас</h4>
							<ul className="list-unstyled">
								<li><a href="#" data-l10n-id="contactUs">Связаться с нами</a></li>
								<li><a href="#" data-l10n-id="deliveryInformation">Предоставленная информация</a></li>
								<li><a href="#" data-l10n-id="privacyPolicy">Политика конфиденциальности</a></li>
								<li><a href="#" data-l10n-id="termsConditions">Условия использования</a></li>
							</ul>
						</div>
						<div className="col-xs-12 col-sm-3 column">
							<h4 data-l10n-id="news">Новости</h4>
							<form>
								<div className="form-group">
								  <input type="text" className="form-control" title="Без спама, мы обещаем!" placeholder="Ваш email" data-l10n-id="inputForSubscribe"/>
								</div>
								<div className="form-group">
								  <button className="btn btn-primary" data-toggle="modal" data-target="#alertModal" type="button" data-l10n-id="subscribeUpdates">Подписаться на обновления</button>
								</div>
							</form>
						</div>
						<div className="col-xs-12 col-sm-3 text-right">
							<h4 data-l10n-id="social">Мы в соцсетях</h4>
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
  render() {
	return <div>
		<HomeNavigation />
		<Header lock={this.props.lock} />
		<About />
		<PopularLanguages />
		<ContactUs />
		<Footer />
	</div>
  }
})

module.exports = Home;
