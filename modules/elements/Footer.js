var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;

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

module.exports = Footer;