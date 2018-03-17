# gService

Standardize the use of external libraries across multiple services.

## Getting Started

### Installing
```
npm install git+ssh://git@github.com/grevych/gService.git
```

### Example
```javascript
const request = require('request-promise');
const gService = require('gService');
const dependencies = require('../package.json').dependencies;


const gatewayName = 'requester';
const serviceName = 'request-promise';
const options = {
  url: 'https://status.github.com/api/',
  version: dependencies[serviceName]
};

const requester = gService.create(gatewayName, serviceName, options);
requester.setModule(request);
requester.request('status.json')
  .then(response => {
      console.log('Github status: %s', response.body.status);
      console.log('Last update: %s', response.body.last_updated);
  });

```
