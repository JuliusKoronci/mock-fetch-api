'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fakeResponse(data) {
    if (!data.body) {
        throw new Error('Mock Data have no body!');
    }
    if (data.status_code && data.status_code >= 500) {
        throw new Error('Mocking Server Error');
    }
    return new Response(JSON.stringify(data.body), {
        'status': data.status_code || 200,
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
}


var mockFetch = _ramda2.default.compose(function (f) {
    return new Promise(f);
}, _ramda2.default.curry(function (response, resolve) {
    return resolve(response);
}), fakeResponse);

var fetchReplacement = _ramda2.default.curry(function (oldFetch, mockData, input, config) {
    return mockData[input] ? mockFetch(mockData[input]) : oldFetch(input, config);
});

exports.default = fetchReplacement(window.fetch);

