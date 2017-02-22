'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fakeResponse(data) {
    return new Response(JSON.stringify(data.body), {
        'status': data.status_code || 200,
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
}


function promiseWrapper(func) {
    return new Promise(func);
}

var mockFetch = _ramda2.default.compose(promiseWrapper, _ramda2.default.curry(function (response, resolve) {
    return resolve(response);
}), fakeResponse);

var fetchReplacement = _ramda2.default.curry(function (oldFetch, mockData, input, config) {
    return mockData[input] ? mockFetch(mockData[input]) : oldFetch(input, config);
});

exports.default = fetchReplacement(window.fetch);

