var exports = {};
exports.supportLanguages = [ 
	{
		shortName: 'en',
		localName: 'English',
		englishName: 'English'
	},
	{
		shortName: 'de',
		localName: 'Deutsch',
		englishName: 'German'
	},
	{
		shortName: 'ru',
		localName: 'Русский',
		englishName: 'Russian'
	}];

exports.supportLanguages.forEach(function(lang) {
	exports[lang.shortName] = require('./locales/' + lang.shortName + '.js');
});

module.exports = exports;