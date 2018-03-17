const Service = require('../../../services');


const REQUEST_OPTIONS = {
  json: true,
  timeout: 120000,
  resolveWithFullResponse: true,
  gzip: true,
};


class RequestPromise extends Service {
  constructor(options) {
    super('request-promise', options);

    this.baseURL = options.url;
    this.useRetry = options.useRetry || false;
    this.retryError = RequestPromise.extractRetryError(this.options);
  }

  static extractRetryError(options) {
    let retryError;
    if (options.error) {
      retryError = options.errors.RequestError;
      delete options.errors
    }
    return retryError;
  }

  // second parameter object: { method = 'GET', useRetry = true, options = {} }
  request(path, { method = 'GET', options = {} } = {}) {
    const requestOptions = Object.assign({}, REQUEST_OPTIONS, this.options, options);
    requestOptions.uri = `${this.baseURL}${path}`;
    const requestMethod = method.toLowerCase();
    return this.module[requestMethod](requestOptions);
  }
}


module.exports = RequestPromise;


