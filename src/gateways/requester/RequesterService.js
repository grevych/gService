const sprintf = require('sprintf');


class RequesterService {
  constructor(name, options = {}) {
    this.name = name;
    this.baseURL = options.url;
    this.useRetry = options.useRetry || false;
  }

  request(path, options) {
    const requestOptions = Object({}, options);
    requestOptions.uri = sprintf('%s/%s', this.baseURL, path);
    return Promise.resolve(requestOptions);
  }
}


module.exports = RequesterService;
