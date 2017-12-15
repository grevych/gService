const sprintf = require('sprintf');
const request = require('request-promise');
const errors = require('request-promise/errors');

const RequesterService = require('../RequesterService');


const RADIX_BASE = 10;
const REQUEST_OPTIONS = {
  json: true,
  timeout: 120000,
  resolveWithFullResponse: true,
  gzip: true,
};


class HTTPRequesterService extends RequesterService {
  constructor(options = {}) {
    super('HttpRequester', options);

    this.options = Object.assign(options, REQUEST_OPTIONS);
    if (options.timeout && typeof options.timeout === 'string') {
      this.options.timeout = parseInt(options.timeout, RADIX_BASE);
    }
    this.retryError = errors.RequestError;
  }

  // second parameter object: { method = 'GET', useRetry = true, options = {} }
  request(path, { method = 'GET', options = {} } = {}) {
    const requestOptions = Object.assign({}, options, this.options);
    requestOptions.uri = sprintf('%s%s', this.baseURL, path);
    const requestMethod = method.toLowerCase();
    return request[requestMethod](requestOptions);
  }
}


module.exports = HTTPRequesterService;
