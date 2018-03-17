const retry = require('retry-as-promised');

const Gateway = require('../../gateways');


const ERROR_FAILED_ON_REQUEST = 'Failed request to: %s%s';
const RETRY_EXPONENTIAL_BACKOFF_SETTINGS = {
  max: 3,
  match: [],
  timeout: 60000,
  backoffBase: 500,
  backoffExponent: 1.3,
};


class Requester extends Gateway {
  constructor(service) {
    super(service);
    this.useRetry = this.service.useRetry;
    RETRY_EXPONENTIAL_BACKOFF_SETTINGS.match.push(this.service.retryError);
  }

  request(path, options) {
    if (this.useRetry) {
      return this.retryRequest(path, options);
    }
    return this.service.request(path, options);
  }

  retryRequest(path, options) {
    const { baseURL } = this.service;

    return retry(() => this.service.request(path, options),
                 RETRY_EXPONENTIAL_BACKOFF_SETTINGS)
      .then(response => response)
      .catch((error) => {
        console.log(error);
      });
  }
}


module.exports = Requester;
