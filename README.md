Mocking Fetch API

### Description

Simple wrapper around Fetch API, it accpets a json object of urls apped to mock response data. 
If the url is called with standard fetch, it will return the mock data without hiting your backend. 
This way you can easily start developing your frontend and create a json tree of fake data to implement for your backend without the need of a REST API.
 
### Instructions
In your index.js file just import the script and assign it to the global window passing in the mockdata

import Fetch from 'igsem-mock-fetch-api';

window.fetch = Fetch({url1: {...fakeData});
