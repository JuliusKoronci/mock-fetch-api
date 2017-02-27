'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HTTP_METHODS = {
	'get': function get(data) {
		return new Response(JSON.stringify(data.body), {
			'status': data.status_code || 200,
			headers: {
				'Content-type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
	},
	'post': function post(data, config) {
		var capturePost = decodeURIComponent(config.body);
		capturePost = JSON.parse(capturePost);
		capturePost['id'] = Math.floor(Date.now() / 1000);

		return new Response(JSON.stringify(capturePost), {
			'status': 201,
			headers: {
				'Content-type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
	},
	'patch': function patch(data, config) {
		return HTTP_METHODS.post(data, config);
	},
	'put': function put(data, config) {
		return HTTP_METHODS.post(data, config);
	},
	'delete': function _delete(data, config) {
		return HTTP_METHODS.post(data, config);
	}
};


function fakeResponse(data) {
	var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { method: 'GET' };

	if (!HTTP_METHODS[config.method.toLowerCase()]) {
		throw new Error('Unsupported HTTP method!');
	}
	validateData(data);
	return HTTP_METHODS[config.method.toLowerCase()](data, config);
}

function validateData(data) {
	if (typeof data.body === 'undefined') {
		throw new Error('Mock Data have no body!');
	}
	if (data.status_code && data.status_code >= 500) {
		throw new Error('Mocking Server Error');
	}
}

function getCleanInput(input) {
	var index = input.indexOf('?');
	return test.substring(0, index !== -1 ? index : input.length);
}

var mockFetch = _ramda2.default.compose(function (f) {
	return new Promise(f);
}, _ramda2.default.curry(function (response, resolve) {
	return resolve(response);
}), fakeResponse);

var fetchReplacement = _ramda2.default.curry(function (oldFetch, mockData, input, config) {
	return mockData[getCleanInput(input)] ? mockFetch(mockData[input], config) : oldFetch(input, config);
});

exports.default = fetchReplacement(window.fetch);
