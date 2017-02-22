import Fetch from '../Fetch';
import 'whatwg-fetch';

const urls = {
    'http://test.com': {
        'body': "some text",
        'status_code': 201
    },
    'http://test2.com': {},
    'http://test3.com': {
        'body': "some text",
        'status_code': 404
    },
    'http://test4.com': {
        'body': "",
        'status_code': 500
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
        }).then(response => response.json()).then((data) => {
            expect(data).toEqual(urls['http://test.com'].body);
            done();
        });
    });
    it('fetch should return an Error', (done) => {
        expect(fetch).toEqual(Fetch);
        try {
            const expectPromise = fetch(urls)('http://test2.com', {});
            expect(false).toBeTruthy();
            done();
        } catch (e) {
            expect(e.message).toEqual('Mock Data have no body!');
            done();
        }
    });
    it('fetch should return a Server Error', (done) => {
        expect(fetch).toEqual(Fetch);
        try {
            const expectPromise = fetch(urls)('http://test4.com', {});
            expect(false).toBeTruthy();
            done();
        } catch (e) {
            expect(e.message).toEqual('Mocking Server Error');
            done();
        }
    });
});