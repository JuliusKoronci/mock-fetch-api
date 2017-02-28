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
		window.mock_fetch_timeout = 300;
		const expectPromise = fetch(urls)('http://test.com', { method: 'GET' });
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
	
	it('With querystring: fetch should return a Promise which will resolve into a Response', (done) => {
		expect(fetch).toEqual(Fetch);
		
		const expectPromise = fetch(urls)('http://test.com?term=wtf', { method: 'GET' });
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
		
		const expectPromise = fetch(urls)('http://test3.com', { method: 'GET' });
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
	
	
	it('OnPost: fetch should return a Promise which will resolve into a Response', (done) => {
		expect(fetch).toEqual(Fetch);
		const postData = { name: 'Julius', surname: 'Koronci', email: 'jk@web-solutions.sk' };
		const expectPromise = fetch(urls)('http://test.com', {
			method: 'POST',
			body: encodeURIComponent(JSON.stringify(postData)),
		});
		expect(expectPromise instanceof Promise).toBeTruthy();
		
		expectPromise.then(response => {
			expect(response instanceof Response).toBeTruthy();
			expect(response.ok).toBeTruthy();
			expect(response.status).toEqual(201);
			return response;
		}).then(response => response.json()).then((data, response) => {
			expect(data.name).toEqual(postData.name);
			expect(data.email).toEqual(postData.email);
			expect(data.surname).toEqual(postData.surname);
			expect(data.id).toBeTruthy();
			done();
		});
	});
	
	it('fetch should return an Error', (done) => {
		expect(fetch).toEqual(Fetch);
		try {
			const expectPromise = fetch(urls)('http://test2.com', { method: 'GET' });
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
			const expectPromise = fetch(urls)('http://test4.com', { method: 'GET' });
			expect(false).toBeTruthy();
			done();
		} catch (e) {
			expect(e.message).toEqual('Mocking Server Error');
			done();
		}
	});
});