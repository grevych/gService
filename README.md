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
  url: 'https://localhost:3000/api/v1/',
  version: dependencies[serviceName]
};

const requester = gService.create(gatewayName, serviceName, options);
requester.setModule(request);
requester.request('objects')
  .then(response => console.log(response));

```
