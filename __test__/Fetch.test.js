import Fetch from '../Fetch';
import 'whatwg-fetch';

const urls = {
    'http://test.com': {
        'body': "some text",
        'status_code': 201
    },
    'http://test2.com': {
        'body': "some text"
    },
    'http://test3.com': {
        'body': "some text",
        'status_code': 404
    }
};

describe('Fetch', () => {
    it('whatwg-fetch should exist', () => {
        expect(fetch).toBeDefined();
    });

    it('Mock Fetch shoudl existt', () => {
        expect(Fetch).toBeDefined();
    });

    it('window fetch should be replaced by the new wrapper', () => {
        expect(fetch).not.toEqual(Fetch);
        window.fetch = Fetch;
        expect(fetch).toEqual(Fetch);
    });

    it('fetch should return a Promise which will resolve into a Response', (done) => {
        expect(fetch).toEqual(Fetch);

        const expectPromise = fetch(urls)('http://test.com', {});
        expect(expectPromise instanceof Promise).toBeTruthy();

        expectPromise.then(response => {
            expect(response instanceof Response).toBeTruthy();
            expect(response.ok).toBeTruthy();
            return response;
        }).then(response => response.json()).then((data, response) => {
            expect(data).toEqual(urls['http://test.com'].body);
            done();
        });
    });
    it('fetch should return a Promise which will resolve into 404 Response', (done) => {
        expect(fetch).toEqual(Fetch);

        const expectPromise = fetch(urls)('http://test3.com', {});
        expect(expectPromise instanceof Promise).toBeTruthy();

        expectPromise.then(response => {
            expect(response instanceof Response).toBeTruthy();
            expect(response.ok).not.toBeTruthy();
            return response;
        }).then(response => response.json()).then((data, response) => {
            expect(data).toEqual(urls['http://test.com'].body);
            done();
        });
    });
});