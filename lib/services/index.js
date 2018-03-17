
const INVALID_MODULE_ERROR = 'Invalid module for service: %s';

class InvalidGServiceModule extends Error {}


class Service {
  constructor(name, options = {}) {
    this.name = name;
    this.options = options;
  }

  init() {
    console.log(`GService: starting service: ${this.name}`);
  }

  setModule(module) {
    this.init();

    if (!module) {
      throw new InvalidGServiceModule(INVALID_MODULE_ERROR, this.name);
    }

    this.module = module;
  }
}


module.exports = Service;
