// add dependencies
var request = require('request');
var zlib = require('zlib');
// set base url
var baseURL = 'https://www.parsehub.com/api/v2';

// constructor - takes your ParseHub API key
//
// var ParseHub = require('parsehubv2');
// var phub = new ParseHub('YOUR API KEY');
//
function ParseHub (apiKey) {
    if (!apiKey) {
        throw Error('Please specify a ParseHub API key');
    } else {
        this._apiKey = apiKey;
    }
}

// get project
//
// phub.getProject({ project_token: 'YOUR PROJECT TOKEN' }, function (err, phProject) {
//     console.log(phProject);
// });
//
ParseHub.prototype.getProject = function (params, callback) {
    var callback = callback || function(){};
    if (!params || !params.project_token) {
        throw new Error('Please specify a project token');
    } else {
        params.api_key = this._apiKey;
        request({ url: baseURL +  '/projects/' + params.project_token, qs: { api_key: params.api_key, format: 'json' } }, function (err, response, body) {
            if (response.statusCode !== 200) {
                callback(err);
            } else {
                var phProject = '';
                var phProject = JSON.parse(body);
                callback(err, phProject);
            }
        });
    }
};

// get last ready data for project
//
// phub.getLastReadyData({ project_token: 'YOUR PROJECT TOKEN' }, function (err, phLastReadyData) {
//     console.log(phLastReadyData);
// });
//
ParseHub.prototype.getLastReadyData = function(params, callback) {
    var callback = callback || function(){};
    if (!params || !params.project_token) {
        throw new Error('Please specify a project token');
    } else {
        params.api_key = this._apiKey;
        var req = request.get({ url: baseURL +  '/projects/' + params.project_token + '/last_ready_run/data', qs: { api_key: params.api_key, format: 'json' } });

        req.on('error', function(err) {
            callback(err);
        });

        req.on('response', function(res) {
            var chunks = [];
            res.on('data', function(chunk) {
                chunks.push(chunk);
            });

            res.on('end', function() {
                var buffer = Buffer.concat(chunks);
                zlib.gunzip(buffer, function(err, phLastReadyData) {
                    callback(err, JSON.parse(phLastReadyData));
                });
            });
        }); 
    }
};

// export module
module.exports = ParseHub;