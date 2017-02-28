##Mocking Fetch API

### Description

Simple wrapper around Fetch API, it accepts a json object of urls mapped to mock response data. 
If the url is called with standard fetch, it will return the mock data without hitting your backend. 
This way you can easily start developing your frontend and create a json tree of fake data to implement 
for your backend without the need of a REST API. Check the test files for examples.

!Note: query params are ignored eg www.url.tld?search=whatever will be resolved to www.url.tld and return standard data.

### HTTP Methods
Default method is GET, if config is provided, PATCH, POST, PUT will return the Resource sent with a generated id and response code 201

### Common use case
Imagine you have a React app in development. You just received the screen which needs to be implemented but the Backend team is behind. You know how the data should look like and you don't want to write unnecessary code just for mocking the BE. In this case the only thing you need to do is define the url of the back end in your mock data and a json with a body key to hold the response. You will still write your calls as normally without worrying about mocking because the mock-api will just wrap your regular Fetch API. You just need to have a if statement at the enrty point of your app which will init the fake fetch like:

```
use_mock_api && window.fetch = Fetch(mockdata);
```

Another advantage is that in the mockData you will build up exactly the structure you require and you just pass it to the BE team..I need this :)

### Simulating slow connection

```
// simulate 3 second latency
window.mock_fetch_timeout = 3000;
```
### Installation
```
yarn add igsem-mock-fetch-api
npm i --save-dev igsem-mock-fetch-api
```
 
### Instructions
In your index.js file just import the script and assign it to the global window passing in the mock data
```
import Fetch from 'igsem-mock-fetch-api';

window.fetch = Fetch(mockdata);
```
example of mockData:
```
const mockData = 
{
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
```

### Requirements
The library uses ES6 features, therefore is meant to be used only with webpack and Babel. 
It is based on functional programming and uses rambda for compose and curry. Type hinting is done via Flow.
