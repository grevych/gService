
class Gateway {
  constructor(service) {
    this.service = service;
  }

  setModule(module) {
    this.service.setModule(module);
  }
}


module.exports = Gateway;
