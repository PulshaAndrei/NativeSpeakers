var host = "ec2-52-48-222-111.eu-west-1.compute.amazonaws.com";
//var host = "localhost"

var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;
var Footer = require('./../elements/Footer');
var EditInformation = require('./EditInformation');
var EditLanguages = require('./EditLanguages');
var Loading = require('react-loading');
import messages from './../localization/messages';
import { browserHistory } from 'react-router';

var MenuDashboard = require('./../elements/MenuDashboard');
var HeaderProfile = require('./../elements/HeaderProfile');

var MenuProfile = React.createClass({
	mixins: [IntlMixin],
	/*<li><a className={this.props.currentEditBlock == 2 ? "currentEditBlock" : ""} onClick={this.props.setEditBlock.bind(null,2)}>{this.getIntlMessage('my_events')}</a></li>*/
	render: function render() {
		return <div className="navigationInProfile">
			<ul>
				<li><a className={this.props.currentEditBlock == 0 ? "currentEditBlock" : ""} onClick={this.props.setEditBlock.bind(null,0)}>{this.getIntlMessage('generaly')}</a></li>
				<li><a className={this.props.currentEditBlock == 1 ? "currentEditBlock" : ""} onClick={this.props.setEditBlock.bind(null,1)}>{this.getIntlMessage('languages')}</a></li>
				<li><a className={this.props.currentEditBlock == 2 ? "currentEditBlock" : ""}>{this.getIntlMessage('my_events')}</a></li>
			</ul> 
		</div>
	}
});

var Profile = React.createClass({

	getInitialState: function getInitialState() {
		var locale = navigator.language.split('-')
		locale = localStorage.getItem('userLocale') ? localStorage.getItem('userLocale') 
			: locale[1] ? `${locale[0]}-${locale[1].toUpperCase()}` : navigator.language
		var strings = messages[locale] ? messages[locale] : messages['en']

		return {
			currentLocale: locale,
			messages: strings,
			profile: null,
			editblock: 0
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

	setEditBlock: function setEditBlock(block) {
		this.setState({editblock: block})
	},

	submitGeneralInfo: function submitGeneralInfo(profile) {
		$.ajax({
			url: 'http://'+host+'/secured/edit_profile',
			method: 'POST',
			data: profile
		}).then(function (data, textStatus, jqXHR) {
			alert("success");
			this.setState({ profile: Object.assign(this.state.profile, profile) });
		}.bind(this), function (err) {
			alert("error")
		});
	},
	submitLanguages: function submitLanguages(data) {
		$.ajax({
			url: 'http://'+host+'/secured/edit_languages',
			method: 'POST',
			data: {languages_list: JSON.stringify(data)}
		}).then(function (dt, textStatus, jqXHR) {
			alert("success");
			var profile = this.state.profile;
			profile.languages = data;
			this.setState({ profile: profile });
		}.bind(this), function (err) {
			alert("error")
		});
	},
	uploadAvatar: function uploadAvatar(dataUri) {
		/*$.ajax({
			url: 'http://'+'localhost'+'/secured/uploadPhoto',
			method: 'POST',
			processData: false,
    		contentType: false,
    		dataType: 'text',
			data: dataUri
		}).then(function (dt, textStatus, jqXHR) {
			alert("success");
		}.bind(this), function (err) {
			alert("error")
		});
		var data = new FormData();
        data.append('uploadFile', dataUri);
         $.ajax({
            url: 'http://'+'localhost'+'/secured/uploadPhoto',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function(response) {
                //var message = file.element.find('td.message');
                if(response.status == 'ok') {
                	alert('ok')
                    //message.html(response.text);
                    //file.element.find('button.uploadButton').remove();
                }
                else {
                	alert(response.errors)
                    //message.html(response.errors);
                }
            },
            xhr: function() {
                var xhr = $.ajaxSettings.xhr();
                if ( xhr.upload ) {
                    console.log('xhr upload');
                    xhr.upload.onprogress = function(e) {
                        /*file.progressDone = e.position || e.loaded;
                        file.progressTotal = e.totalSize || e.total;
                        //обновляем прогресс для файла
                        baseClass.updateFileProgress(index, file.progressDone, file.progressTotal, file.element);
                        //обновляем общий прогресс
                        baseClass.totalProgressUpdated();
                    };
                }
                return xhr;
            }
        });*/
	},
	render: function render() {
		return <div>
			<MenuDashboard
				messages={this.state.messages} 
				currentLocale={this.state.currentLocale} 
				supportedLocales={messages.supportLanguages}
				setCurrentLocale={this.setCurrentLocale} />
			<HeaderProfile
				profile={this.state.profile} 
				uploadAvatar={this.uploadAvatar} />
			<MenuProfile
				messages={this.state.messages} 
				setEditBlock={this.setEditBlock}
				currentEditBlock={this.state.editblock} />
			{this.state.profile == null
				? <div className="row vertical-align" style={{margin: 0}}>
					<div className="col-md-12" style={{minHeight: '50%', padding: '0', background: '#f9f9f9'}}>
						<Loading type='bubbles' color='#9C27B0' />
					</div>
				</div>
				: <div>
					{this.state.editblock == 0 && 
						<EditInformation 
							messages={this.state.messages} 
							profile={this.state.profile}
							submitGeneralInfo={this.submitGeneralInfo} />}
					{this.state.editblock == 1 && 
						<EditLanguages 
							messages={this.state.messages} 
							profile={this.state.profile} 
							submitLanguages={this.submitLanguages} />}
				</div>
			}
			<Footer messages={this.state.messages} />
		</div>
	}
})

module.exports = Profile;