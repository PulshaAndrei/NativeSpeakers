var React = require('react');

var HeaderProfile = React.createClass({
	render: function render() {
		return <header className="header-profile">
			<img className="imageProfileHeader" src="https://s.gravatar.com/avatar/2105471f3c2aea7742481912f454ff0e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fmi.png" />
			<h2 className="labelProfileHeader">Анрей Пульша</h2>
		</header>
	}
})

module.exports = HeaderProfile;