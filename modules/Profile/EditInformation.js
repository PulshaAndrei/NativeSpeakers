var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;
var DateTimeField = require('react-bootstrap-datetimepicker');
var moment = require('moment');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var EditInformation = React.createClass({
	mixins: [LinkedStateMixin],
	getInitialState: function getInitialState() {

		$('body').scrollspy({target:'.navbar-fixed-top',offset:60});
		$('#topNav').affix({offset:{top:50}});
		new WOW().init();

		var profile = this.props.profile;
		return {
			given_name: profile.given_name,
			family_name: profile.family_name,
			gender: profile.gender,
			birthday: profile.birthday,
			country: profile.country,
			city: profile.city,
			education: profile.education,
			occupation: profile.occupation,
			about_me: profile.about_me,
			contactsVkontakte: profile.contactsVkontakte,
			contactsFacebook: profile.contactsFacebook,
			contactsSkype: profile.contactsSkype,
			contactsEmail: profile.contactsEmail
		}
	},
	submit: function submit() {
		this.props.submitGeneralInfo(this.state);
	},
	logout: function logout() {
		localStorage.removeItem('userToken');
		window.location = "./";
	},
	changeGender: function changeGender(gender) {
		this.setState({gender: gender});
	},
	changeBirthday: function changeBirthday(x) {
		this.setState({birthday: x == "Invalid date" ? x : moment(new Date(parseInt(x))).format("YYYY-MM-DD")});
	},
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
							<input className="form-control-bootstrap" type="text" valueLink={this.linkState('given_name')}/>
						</div>
						<div className="field">
							<div className="field-title">Family name</div>
							<input className="form-control-bootstrap" type="text" valueLink={this.linkState('family_name')}/>
						</div>
						<div className="field">
							<div className="field-title">Gender</div>
							<div className="btn-group field-radio" data-toggle="buttons">
							  <label className={"btn btn-info" + (this.state.gender == "male" ? " active" : "")} onClick={this.changeGender.bind(null,"male")}>
							    <input type="radio" name="options" id="option1" autoComplete="off" /> Male
							  </label>
							  <label className={"btn btn-info" + (this.state.gender == "female" ? " active" : "")} onClick={this.changeGender.bind(null,"female")}>
							    <input type="radio" name="options" id="option2" autoComplete="off" /> Female
							  </label>
							</div>
						</div>
						<div className="field">
							<div className="field-title">Birthday</div>
							<DateTimeField inputFormat="DD.MM.YYYY" showToday={false} mode="date" defaultText={moment(new Date(this.state.birthday)).format("DD.MM.YYYY")} onChange={this.changeBirthday}/>
						</div>
					</div>
					<div className="col-md-4">
						<div className="field">
							<div className="field-title">Country</div>
							<input className="form-control-bootstrap" type="text" valueLink={this.linkState('country')}/>
						</div>
						<div className="field">
							<div className="field-title">City</div>
							<input className="form-control-bootstrap" type="text" valueLink={this.linkState('city')}/>
						</div>
						<div className="field">
							<div className="field-title">Education</div>
							<input className="form-control-bootstrap" type="text" valueLink={this.linkState('education')}/>
						</div>
						<div className="field">
							<div className="field-title">Profession</div>
							<input className="form-control-bootstrap" type="text" valueLink={this.linkState('occupation')}/>
						</div>
					</div>
					<div className="col-md-4">
						<div className="field">
							<div className="field-title">About me</div>
							<textarea className="form-control-bootstrap" rows="14" style={{height:'287px'}} valueLink={this.linkState('about_me')}></textarea>
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
						      <input type="text" className="form-control-bootstrap" style={{borderRadius: '0 4px 4px 0'}} id="exampleInputAmount" placeholder="VKontakte" valueLink={this.linkState('contactsVkontakte')}/>
						    </div>
						  </div>
						</div>
						<div className="col-md-3">
						  <div className="form-group">
						    <div className="input-group">
						      <div className="input-group-addon">F</div>
						      <input type="text" className="form-control-bootstrap" style={{borderRadius: '0 4px 4px 0'}} id="exampleInputAmount" placeholder="Facebook" valueLink={this.linkState('contactsFacebook')}/>
						    </div>
						  </div>
						</div>
						<div className="col-md-3">
						  <div className="form-group">
						    <div className="input-group">
						      <div className="input-group-addon">S</div>
						      <input type="text" className="form-control-bootstrap" style={{borderRadius: '0 4px 4px 0'}} id="exampleInputAmount" placeholder="Skype" valueLink={this.linkState('contactsSkype')}/>
						    </div>
						  </div>
						</div>
						<div className="col-md-3">
						  <div className="form-group">
						    <div className="input-group">
						      <div className="input-group-addon">E</div>
						      <input type="text" className="form-control-bootstrap" style={{borderRadius: '0 4px 4px 0'}} id="exampleInputAmount" placeholder="E-mail" valueLink={this.linkState('contactsEmail')}/>
						    </div>
						  </div>
						</div>
					</div>
				</div>
				<div className="row text-center" style={{marginTop: '20px'}}>
					<div className="col-md-6 text-center"  style={{margin: '20px 0'}}>
						<button type="button" className="btn btn-success btn-lg" style={{minWidth: '280px'}} onClick={this.submit}>Submit</button>
					</div>
					<div className="col-md-6 text-center"  style={{margin: '20px 0'}}>
						<button type="button" className="btn btn-danger btn-lg" style={{minWidth: '280px'}} onClick={this.logout}>Logout</button>
					</div>
				</div>
			</div>
		</div>
	}
});

module.exports = EditInformation;