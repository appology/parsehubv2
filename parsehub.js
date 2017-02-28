'use strict';
// add dependencies
var request = require('request');
var zlib = require('zlib');
// set base url
var baseURL = 'https://www.parsehub.com/api/v2';

// require the module and fire it up using your parsehub api key
//
// var ParseHub = require('parsehubv2');
// var phub = new ParseHub('YOUR API KEY');
//
function ParseHub(apiKey) {
	if (!apiKey) {
		throw new Error('Please specify a ParseHub API key');
	} else {
		this._apiKey = apiKey;
	}
}

// get a list of your projects
//
// phub.getProjectList(function (err, phProjectList) {
//     console.log(phProjectList);
// });
//
ParseHub.prototype.getProjectList = function (params, callback) {
	params.api_key = this._apiKey;
	request({ url: baseURL +  '/projects', qs: { api_key: params.api_key, format: 'json' } }, function (err, response, body) {
		if (response.statusCode !== 200) {
			callback(err);
		} else {
			var phProjectList = JSON.parse(body);
			callback(err, phProjectList);
		}
	});
};

// get a project
//
// phub.getProject(function (err, phProject) {
//     console.log(phProject);
// });
//
ParseHub.prototype.getProject = function (params, callback) {
	if (!params || !params.project_token) {
		throw new Error('Please specify a project token');
	} else {
		params.api_key = this._apiKey;
		request({ url: baseURL +  '/projects/' + params.project_token, qs: { api_key: params.api_key, format: 'json' } }, function (err, response, body) {
			if (response.statusCode !== 200) {
				callback(err);
			} else {
				var phProject = JSON.parse(body);
				callback(err, phProject);
			}
		});
	}
};

// run a project
//
// phub.runProject({ project_token: 'YOUR PROJECT TOKEN' }, function (err, phProjectRun) {
//     console.log(phProjectRun);
// });
//
ParseHub.prototype.runProject = function (params, callback) {
	if (!params || !params.project_token) {
		throw new Error('Please specify a project token');
	} else {
		params.api_key = this._apiKey;
		request({ url: baseURL +  '/projects/' + params.project_token + '/run', method: 'POST', qs: { api_key: params.api_key, format: 'json' } }, function (err, response, body) {
			if (response.statusCode !== 200) {
				callback(err);
			} else {
				var phProjectRun = JSON.parse(body);
				callback(err, phProjectRun);
			}
		});
	}
};

// get a project run
//
// phub.getRun({ run_token: 'YOUR RUN TOKEN' }, function (err, phRun) {
//     console.log(phRun);
// });
//
ParseHub.prototype.getRun = function (params, callback) {
	if (!params || !params.run_token) {
		throw new Error('Please specify a run token');
	} else {
		params.api_key = this._apiKey;
		request({ url: baseURL +  '/runs/' + params.run_token, qs: { api_key: params.api_key, format: 'json' } }, function (err, response, body) {
			if (response.statusCode !== 200) {
				callback(err);
			} else {
				var phRun = JSON.parse(body);
				callback(err, phRun);
			}
		});
	}
};

// cancel a project run
//
// phub.cancelRun({ run_token: 'YOUR RUN TOKEN' }, function (err, phCancelledRun) {
//     console.log(phCancelledRun);
// });
//
ParseHub.prototype.cancelRun = function (params, callback) {
	if (!params || !params.run_token) {
		throw new Error('Please specify a run token');
	} else {
		params.api_key = this._apiKey;
		request({ url: baseURL +  '/runs/' + params.run_token + '/cancel', method: 'POST', qs: { api_key: params.api_key, format: 'json' } }, function (err, response, body) {
			if (response.statusCode !== 200) {
				callback(err);
			} else {
				var phCancelledRun = JSON.parse(body);
				callback(err, phCancelledRun);
			}
		});
	}
};

// delete a project run
//
// phub.deleteRun({ run_token: 'YOUR RUN TOKEN' }, function (err, phDeletedRun) {
//     console.log(phDeletedsRun);
// });
//
ParseHub.prototype.deleteRun = function (params, callback) {
	if (!params || !params.run_token) {
		throw new Error('Please specify a run token');
	} else {
		params.api_key = this._apiKey;
		request({ url: baseURL +  '/runs/' + params.run_token, method: 'DELETE', qs: { api_key: params.api_key, format: 'json' } }, function (err, response, body) {
			if (response.statusCode !== 200) {
				callback(err);
			} else {
				var phDeletedRun = JSON.parse(body);
				callback(err, phDeletedRun);
			}
		});
	}
};

// get project run data
//
// phub.getRunData({ run_token: 'YOUR RUN TOKEN' }, function (err, phRunData) {
//     console.log(phRunData);
// });
//
ParseHub.prototype.getRunData = function (params, callback) {
	if (!params || !params.run_token) {
		throw new Error('Please specify a run token');
	} else {
		params.api_key = this._apiKey;
		var req = request.get({ url: baseURL +  '/runs/' + params.run_token + '/data', qs: { api_key: params.api_key, format: 'json' } });

		req.on('error', function (err) {
			callback(err);
		});

		req.on('response', function (res) {
			var chunks = [];
			res.on('data', function (chunk) {
				chunks.push(chunk);
			});

			res.on('end', function () {
				var buffer = Buffer.concat(chunks);
				zlib.gunzip(buffer, function (err, phRunData) {
					if (err) {
						callback(err);
					} else {
						callback(err, JSON.parse(phRunData));
					}
				});
			});
		});
	}
};

// get last ready project data
//
// phub.getLastReadyData({ project_token: 'YOUR PROJECT TOKEN' }, function (err, phLastReadyData) {
//     console.log(phLastReadyData);
// });
//
ParseHub.prototype.getLastReadyData = function (params, callback) {
	if (!params || !params.project_token) {
		throw new Error('Please specify a project token');
	} else {
		params.api_key = this._apiKey;
		var req = request.get({ url: baseURL +  '/projects/' + params.project_token + '/last_ready_run/data', qs: { api_key: params.api_key, format: 'json' } });

		req.on('error', function (err) {
			callback(err);
		});

		req.on('response', function (res) {
			var chunks = [];
			res.on('data', function (chunk) {
				chunks.push(chunk);
			});

			res.on('end', function () {
				var buffer = Buffer.concat(chunks);
				zlib.gunzip(buffer, function (err, phLastReadyData) {
					if (err) {
						callback(err);
					} else {
						callback(err, JSON.parse(phLastReadyData));
					}
				});
			});
		});
	}
};

// export module
module.exports = ParseHub;