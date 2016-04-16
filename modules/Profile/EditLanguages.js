var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Select = require('react-select');
var LanguagesList = require('./../localization/LanguagesList');

var EditLanguages = React.createClass({
	mixins: [IntlMixin],
	getInitialState: function getInitialState() {
		return {
			langs: this.props.profile.languages,
			currentLang: {
				language: null,
				level: null,
				teacher: false,
				student: false
			}
		}
	},
	submit: function submit() {
		var data = [];
		this.state.langs.map(function(el){ data.push(el) });
		this.props.submitLanguages(data);
	},
	cancel: function cancel() {
		console.log("cancel")
		console.log(this.props.profile.languages)
		this.setState({
			langs: this.props.profile.languages,
			currentLang: {
				language: null,
				level: null,
				teacher: false,
				student: false
			}
		});
	},
	currentLangChange: function logChange(val) {
		var currentLang = this.state.currentLang;
		currentLang.language = val.value;
		this.setState({currentLang: currentLang});
	},
	langChange: function langChange(index, val) {
		var langs = this.state.langs;
		langs[index].language = val.value;
		this.setState({langs: langs});
	},
	changeCurrentLevel: function changeLevel(val) {
		var currentLang = this.state.currentLang;
		currentLang.level = val;
		this.setState({currentLang: currentLang});	
	},
	changeLevel: function changeLevel(index, val) {
		var langs = this.state.langs;
		langs[index].level = val;
		this.setState({langs: langs});
	},
	studentChange: function studentChange(index) {
		var langs = this.state.langs;
		langs[index].student = !langs[index].student;
		this.setState({langs: langs});
	},
	teacherChange: function teacherChange(index) {
		var langs = this.state.langs;
		langs[index].teacher = !langs[index].teacher;
		this.setState({langs: langs});
	},
	changeCurrentStudent: function changeCurrentStudent() {
		var currentLang = this.state.currentLang;
		currentLang.student = !currentLang.student;
		this.setState({currentLang: currentLang});	
	},
	changeCurrentTeacher: function changeCurrentTeacher() {
		var currentLang = this.state.currentLang;
		currentLang.teacher = !currentLang.teacher;
		this.setState({currentLang: currentLang});	
	},
	addLanguage: function addLanguage() {
		if (!this.state.currentLang.language) return;
		var langs = this.state.langs;
		langs.push(this.state.currentLang);
		this.setState({
			langs: langs,
			currentLang: {
				language: null,
				level: null,
				teacher: false,
				student: false
			}
		})
	},
	removeLang: function removeLang(index){
		var langs = this.state.langs;
		delete langs[index];
		this.setState({langs: langs});
	},
	render: function render() {
		var options = LanguagesList.map(function(el, i) {
			return {value: i, label: el.name + " (" + el.nativeName + ")"}
		});
		var self = this;
		console.log(this.state.langs)
		var langs_list = this.state.langs.map(function(el, i){
			var labl = LanguagesList[self.state.langs[i].language];
			return <div className="row languageBlock addLanguageBlock" key={"lang"+i}>
					<div className="col-md-11 col-xs-11"><h2>{labl.name + " (" + labl.nativeName + ")"}</h2></div>
					<div className="col-md-1 removeLangButton" onClick={self.removeLang.bind(null,i)}></div>
					<div className="col-md-4">
						<div className="field-title">{self.getIntlMessage('language')}</div>
						<Select
						    value={self.state.langs[i].language}
						    placeholder={self.getIntlMessage('choose_language_please')}
						    noResultsText={self.getIntlMessage('no_results_found')}
						    options={options}
						    clearable={false}
						    backspaceRemoves={false}
						    autosize={true}
						    onChange={self.langChange.bind(null, i)} />

						<div className="checkbox">
						  <label>
						    <input type="checkbox" checked={self.state.langs[i].student} onChange={self.studentChange.bind(null, i)}/>
						    {self.getIntlMessage('i_want_to_learn_language')}
						  </label>
						</div>
						<div className="checkbox">
						  <label>
						    <input type="checkbox" checked={self.state.langs[i].teacher} onChange={self.teacherChange.bind(null, i)} />
						    {self.getIntlMessage('i_can_help_you_learn_the_language')}
						  </label>
						</div>
					</div>
					<div className="col-md-8">
						<div className="field-title">{self.getIntlMessage('language_proficiency_level')}</div>
						<div className="btn-group btn-block"  data-toggle="buttons">
							<label className={"btn btn-secondary" + (self.state.langs[i].level == 0 ? " active" : "")} onClick={self.changeLevel.bind(null,i,0)}>
								<input type="radio" name="options" id="option1" autoComplete="off" /> A1
							</label>
							<label className={"btn btn-secondary" + (self.state.langs[i].level == 1 ? " active" : "")} onClick={self.changeLevel.bind(null,i,1)}>
								<input type="radio" name="options" id="option2" autoComplete="off" /> A2
							</label>
							<label className={"btn btn-secondary" + (self.state.langs[i].level == 2 ? " active" : "")} onClick={self.changeLevel.bind(null,i,2)}>
								<input type="radio" name="options" id="option2" autoComplete="off" /> B1
							</label>
							<label className={"btn btn-secondary" + (self.state.langs[i].level == 3 ? " active" : "")} onClick={self.changeLevel.bind(null,i,3)}>
								<input type="radio" name="options" id="option1" autoComplete="off" /> B2
							</label>
							<label className={"btn btn-secondary" + (self.state.langs[i].level == 4 ? " active" : "")} onClick={self.changeLevel.bind(null,i,4)}>
								<input type="radio" name="options" id="option2" autoComplete="off" /> C1
							</label>
							<label className={"btn btn-secondary" + (self.state.langs[i].level == 5 ? " active" : "")} onClick={self.changeLevel.bind(null,i,5)}>
								<input type="radio" name="options" id="option2" autoComplete="off" /> C2
							</label>
							<label className={"btn btn-secondary" + (self.state.langs[i].level == 6 ? " active" : "")} onClick={self.changeLevel.bind(null,i,6)}>
								<input type="radio" name="options" id="option2" autoComplete="off" /> {self.getIntlMessage('native_language')}
							</label>
						</div>
					</div>
				</div>
		});
		return <div className="editblock">
			<div className="container">
				{langs_list}
				<div className="row languageBlock addLanguageBlock">
					<div className="col-md-4 col-xs-11">
						<div className="field-title">{self.getIntlMessage('language')}</div>
						<Select
						    value={this.state.currentLang.language}
						    placeholder={this.getIntlMessage('choose_language_please')}
						    noResultsText={this.getIntlMessage('no_results_found')}
						    options={options}
						    clearable={false}
						    backspaceRemoves={false}
						    autosize={true}
						    onChange={this.currentLangChange} />

						<div className="checkbox">
						  <label>
						    <input type="checkbox" checked={self.state.currentLang.student} onChange={self.changeCurrentStudent}/>
						    {self.getIntlMessage('i_want_to_learn_language')}
						  </label>
						</div>
						<div className="checkbox">
						  <label>
						    <input type="checkbox" checked={self.state.currentLang.teacher} onChange={self.changeCurrentTeacher}/>
						    {self.getIntlMessage('i_can_help_you_learn_the_language')}
						  </label>
						</div>
					</div>
					<div className="col-md-8">
						<div className="field-title">{self.getIntlMessage('language_proficiency_level')}</div>
						<div className="btn-group btn-block"  data-toggle="buttons">
							<label className={"btn btn-secondary" + (this.state.currentLang.level == 0 ? " active" : "")} onClick={this.changeCurrentLevel.bind(null,0)}>
								<input type="radio" name="options" id="option1" autoComplete="off" /> A1
							</label>
							<label className={"btn btn-secondary" + (this.state.currentLang.level == 1 ? " active" : "")} onClick={this.changeCurrentLevel.bind(null,1)}>
								<input type="radio" name="options" id="option2" autoComplete="off" /> A2
							</label>
							<label className={"btn btn-secondary" + (this.state.currentLang.level == 2 ? " active" : "")} onClick={this.changeCurrentLevel.bind(null,2)}>
								<input type="radio" name="options" id="option2" autoComplete="off" /> B1
							</label>
							<label className={"btn btn-secondary" + (this.state.currentLang.level == 3 ? " active" : "")} onClick={this.changeCurrentLevel.bind(null,3)}>
								<input type="radio" name="options" id="option1" autoComplete="off" /> B2
							</label>
							<label className={"btn btn-secondary" + (this.state.currentLang.level == 4 ? " active" : "")} onClick={this.changeCurrentLevel.bind(null,4)}>
								<input type="radio" name="options" id="option2" autoComplete="off" /> C1
							</label>
							<label className={"btn btn-secondary" + (this.state.currentLang.level == 5 ? " active" : "")} onClick={this.changeCurrentLevel.bind(null,5)}>
								<input type="radio" name="options" id="option2" autoComplete="off" /> C2
							</label>
							<label className={"btn btn-secondary" + (this.state.currentLang.level == 6 ? " active" : "")} onClick={this.changeCurrentLevel.bind(null,6)}>
								<input type="radio" name="options" id="option2" autoComplete="off" /> {self.getIntlMessage('native_language')}
							</label>
						</div>
						{this.state.currentLang.level != 6 && this.state.currentLang.level != null &&
							<div className="levelDescription">{this.getIntlMessage("level_"+this.state.currentLang.level)}</div>}
					</div>
					<div className="col-md-12 text-center">
						<button type="button" className="btn btn-info btn-lg hidden-xs" style={{minWidth: '280px', marginTop: '10px'}} onClick={this.addLanguage}>{self.getIntlMessage('add_language')}</button>
						<button type="button" className="btn btn-info btn-lg visible-xs-inline" style={{width: '100%', marginTop: '10px'}} onClick={this.addLanguage}>{self.getIntlMessage('add_language')}</button>
					</div>
				</div>
				<div className="row text-center" style={{marginTop: '20px'}}>
					<div className="col-md-6 text-center"  style={{margin: '20px 0'}}>
						<button type="button" className="btn btn-success btn-lg" style={{minWidth: '280px'}} onClick={this.submit}>{self.getIntlMessage('submit')}</button>
					</div>
					<div className="col-md-6 text-center"  style={{margin: '20px 0'}}>
						<button type="button" className="btn btn-danger btn-lg" style={{minWidth: '280px'}} onClick={this.cancel}>{self.getIntlMessage('cancel')}</button>
					</div>
				</div>
			</div>
		</div>
	}
});

module.exports = EditLanguages;