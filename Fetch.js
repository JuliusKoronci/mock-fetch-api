// @flow
import _ from 'ramda';

const HTTP_METHODS = {
	'get': function(data) {
		return new Response(JSON.stringify(data.body), {
			'status': data.status_code || 200,
			headers: {
				'Content-type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		});
	},
	'post': function(data, config) {
		let capturePost = decodeURIComponent(config.body);
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
	'patch': function(data, config) {
		return HTTP_METHODS.post(data, config);
	},
	'put': function(data, config) {
		return HTTP_METHODS.post(data, config);
	},
	'delete': function(data, config) {
		return HTTP_METHODS.post(data, config);
	},
};

function fakeResponse(request: {
	data:{
		body: any,
		status_code: ?number
	},
	'config':{
		method: string
	}
}): Response {
	try {
		return HTTP_METHODS[request.config.method.toLowerCase()](request.data, request.config);
	} catch (e) {
		throw new Error('HTTP Method not supported or invalid config!');
	}
}

function validateData(data, config) {
	if (typeof data.body === 'undefined') {
		throw new Error('Mock Data have no body!');
	}
	if (data.status_code && data.status_code >= 500) {
		throw new Error('Mocking Server Error');
	}
	
	return { data, config };
}

function getCleanInput(input) {
	const index = input.indexOf('?');
	return input.substring(0, index !== -1 ? index : input.length);
}

const mockFetch = _.compose((f) => new Promise(f), _.curry((response, resolve) => resolve(response)), fakeResponse, validateData);

const fetchReplacement = _.curry((oldFetch: Function, mockData: Object, input: string, config: Object) => {
	const i = getCleanInput(input);
	return mockData[i] ? mockFetch(mockData[i], config) : oldFetch(input, config);
});

export default fetchReplacement(window.fetch);

