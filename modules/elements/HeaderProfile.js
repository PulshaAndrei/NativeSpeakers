var React = require('react');

var HeaderProfile = React.createClass({
	render: function render() {
		return <header className="header-profile">
			<div className="imageProfileHeaderBlock">
				<img className="imageProfileHeader" src={this.props.profile && this.props.profile.gender == "female" ? "image/female_icon.png" : "image/male_icon.png"} />
				<div className="text-center">Load new photo</div>
			</div>
			<h2 className="labelProfileHeader">{this.props.profile ? this.props.profile.given_name+" "+this.props.profile.family_name : ""}</h2>
		</header>
	}
})

module.exports = HeaderProfile;