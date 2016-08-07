var util = require('../util.test');

module.exports = function() {
	util.request({
		url: 'http://params.test.whistlejs.com/index.html',
		method: 'POST',
		form: {key: 'value'}
	}, function(res, data) {
		data.body.should.equal('key=value&test=abc');
	});
	
	util.request({
		url: 'http://upload.test.whistlejs.com/index.html',
		formData: {
			  name1: 'my_value',
			  name2: 'hehe',
			  file1: {
			    value:  'ok',
			    options: {
			      filename: 'topsecret.jpg',
			      contentType: 'text/plain'
			    }
			  }
		}
	}, function(res, data) {
//		data.body.should.equal('key=value&test=abc');
		console.log(data);
	});
	
	util.request('http://params2.test.whistlejs.com/index.html?name=aven', function(res, data) {
		data.url.should.containEql('?name=aven&test=abc')
	});
};