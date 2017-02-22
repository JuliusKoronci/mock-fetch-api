// @flow
import _ from 'ramda';

function fakeResponse(data: {
    'body': Object,
    'status_code': ?number
}): Response {
    return new Response(JSON.stringify(data.body), {
        'status': data.status_code || 200,
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
}


const fetchReplacement = _.curry((oldFetch: Function, mockData: Object, input: string, config: Object) => {
    return mockData[input] ? Promise.resolve(fakeResponse(mockData[input])) : oldFetch(input, config);
});

export default fetchReplacement(window.fetch);

