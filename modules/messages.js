// This is essentially bulk require
/*var req = require.context('../locales', true, /\.json.*$/); 
req.keys().forEach(function (file) {  
  var locale = file.replace('./', '').replace('.json', '');
  exports[locale] = req(file);
});*/ 

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
	exports[lang.shortName] = require('../locales/' + lang.shortName + '.js');
});

module.exports = exports;