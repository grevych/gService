
class Gateway {
  constructor(service) {
    this.service = service;
  }

  static create(gateway, service, configuration) {
    let Klass;
    let gService;

    try {
      Klass = require(`./${gateway}/${service}`);
      const service = new Klass(configuration);
      Klass = require(`./${gateway}`);
      gService = new Klass(service);
    } catch (error) {
      // TODO: Create ServiceNotFound and ServiceNotLoaded errors
      throw error;
    }

    return gService;
  }
}


module.exports = Gateway;
