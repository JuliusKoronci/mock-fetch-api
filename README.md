##Mocking Fetch API

### Description

Simple wrapper around Fetch API, it accpets a json object of urls mapped to mock response data. 
If the url is called with standard fetch, it will return the mock data without hitting your backend. 
This way you can easily start developing your frontend and create a json tree of fake data to implement 
for your backend without the need of a REST API.

### Instalation
yarn add igsem-mock-fetch-api

npm i --save-dev igsem-mock-fetch-api
 
### Instructions
In your index.js file just import the script and assign it to the global window passing in the mock data

import Fetch from 'igsem-mock-fetch-api';

window.fetch = Fetch({url1: {...fakeData});

example:

const urls = 

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

### Requirements
The library uses ES6 features, therefore is meant to be used only with webpack and Babel. 
It is based on functional programming and uses rambda for compose and curry. Type hinting is done via Flow.
