Mocking Fetch API

### Description

Simple wrapper around Fetch API, it accpets a json object of urls mapped to mock response data. 
If the url is called with standard fetch, it will return the mock data without hitting your backend. 
This way you can easily start developing your frontend and create a json tree of fake data to implement for your backend without the need of a REST API.
 
### Instructions
In your index.js file just import the script and assign it to the global window passing in the mock data

import Fetch from 'igsem-mock-fetch-api';

window.fetch = Fetch({url1: {...fakeData});
