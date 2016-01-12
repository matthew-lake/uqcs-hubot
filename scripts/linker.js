// Description
//   Creates helpful links - currently listens for 'r/whatever' and sends the reddit link
//
var https = require("https");

module.exports = function (robot) {

	// Reddit links
	robot.hear(/\/(.+)/i, function (res) {
		var url = "https://www.reddit.com/r/" + res.match[1];
		exists(url)
			.then(function() {
				res.send(`Link for the lazy: ${url}`);
			});
	});

	// Checks if the link target exists
	var exists = function (url) {
		return new Promise(function(resolve, reject) {
			https.get(url, function (resp, err) {
				if (!err && resp.statusCode === 200) {
					resolve();
				}
				reject();
			});
		});
	};

};
