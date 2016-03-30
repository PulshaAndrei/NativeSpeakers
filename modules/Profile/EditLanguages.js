var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var EditLanguages = React.createClass({
	mixins: [LinkedStateMixin],
	getInitialState: function getInitialState() {
		return {}
	},
	submit: function submit() {
		this.props.submitGeneralInfo(this.state);
	},
	render: function render() {
		return <div className="editblock">
			<div className="container">
				<div className="row">
					<div className="col-md-12 languageBlock"></div>
				</div>
			</div>
		</div>
	}
});

module.exports = EditLanguages;