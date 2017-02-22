// @flow
import _ from 'ramda';

function fakeResponse(data: {
    'body': Object,
    'status_code': ?number
}): Response {
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
    })
}

const mockFetch = _.compose((f) => new Promise(f), _.curry((response, resolve) => resolve(response)), fakeResponse);


const fetchReplacement = _.curry((oldFetch: Function, mockData: Object, input: string, config: Object) => {
    return mockData[input] ? mockFetch(mockData[input]) : oldFetch(input, config);
});

export default fetchReplacement(window.fetch);

