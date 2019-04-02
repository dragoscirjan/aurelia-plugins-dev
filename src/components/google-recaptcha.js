import environment from '../environment';
import { Component } from '../resources/component';

import { inject, LogManager } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import {ValidationController, ValidationRules} from 'aurelia-validation';
import { className } from 'amaranth-utils';

@inject(EventAggregator, ValidationController)
export class GoogleRecaptcha extends Component {
  /** @var {Array} */
  checked = [];

  renderedWithDelay = false;

  objectV2 = {
    token: null
  };

  objectV2i = {
    token: null
  };

  objectV3 = {
    token: null
  };

  constructor(events, validator) {
    super();

    this.events = events;
    this.validator = validator;
    this.logger = LogManager.getLogger(className(this));

    this.recaptchaV2 = environment.siteKeys.v2;
    this.recaptchaV2Invisible = environment.siteKeys.v2i;
    this.recaptcha = environment.siteKeys.v3;

    // Using ValidationController is not mandatory.
    for (const name of ['tokenValidateV2', 'tokenValidateV2i'/*, 'tokenValidateV3'*/]) {
      ValidationRules
        .ensure(name).required().withMessage('Please verify the recaptcha.')
        .on(this);
    }

    setTimeout(() => {
      this.renderedWithDelay = true;
    }, 5000);
  }

  /**
   *
   * @param {String} id
   * @param {String} name
   */
  async execute(id, name = null) {
    switch (name) {
    case 'objectV2':
      break;
    case 'objectV2i':
      id = this.idValidateV2i;
      break;
    case 'objectV3':
      id = this.idValidateV3;
      break;
    default:
      break;
    }
    if (!id) {
      return;
    }
    this.logger.debug(`Calling grecaptcha:execute:${id}`);
    this.events.publish(`grecaptcha:execute:${id}`);

    if (!name) {
      return new Promise((resolve) => resolve);
    }

    return new Promise((resolve, reject) => {
      // constantly check for token
      const interval = setInterval(() => {
        if (this[name].token) {
          resolve();
          clearInterval(interval);
        }
      }, 500);
      // to the above check for a certain amount of time, then fail
      setTimeout(() => {
        if (interval) {
          clearInterval(interval);
          reject();
        }
      }, 20000);
    });
  }

  executeSimpleV2i() {
    this.execute(this.idSimpleV2i);
  }

  executeSimpleV3() {
    this.execute(this.idSimpleV3);
  }

  get isAuto() {
    return this.checked.filter(v => v === 'auto').length;
  }

  reset(id) {
    this.logger.debug(`Calling grecaptcha:reset:${id}`);
    this.events.publish(`grecaptcha:reset:${id}`);
  }

  resetSimpleV2() {
    this.logger.debug(`Calling grecaptcha:reset:${this.idSimpleV2i}`);
    this.events.publish(`grecaptcha:reset:${this.idSimpleV2}`);
  }

  resetSimpleV2i() {
    this.logger.debug(`Calling grecaptcha:reset:${this.idSimpleV2i}`);
    this.events.publish(`grecaptcha:reset:${this.idSimpleV2i}`);
  }

  async validate(name) {
    this.logger.debug('Attempting validation for:', this.tokenValidateV2, this.tokenValidateV2i, this.tokenValidateV3);
    if (name !== 'validV2') {
      await this.execute(null, name);
    }
    try {
      this.vResult = await this.validator.validate();
      console.log(this.vResult);
    } catch (e) {
      this.logger.error(e);
    }
  }

  // under this line everything is deprecated

  bind(...args) {
    window.callbackIAmHumanV2C2 = $event => {
      console.log('I am human!'); // eslint-disable-line no-console
      console.log($event); // eslint-disable-line no-console
    };
    window.callbackIAmHumanV2IC2 = $event => {
      console.log('I am human (invisible)!'); // eslint-disable-line no-console
      console.log($event); // eslint-disable-line no-console
    };
    window.callbackIAmHumanV2C4 = $event => {
      console.log('I am human no more!'); // eslint-disable-line no-console
      console.log($event); // eslint-disable-line no-console
    };
  }

  bindedCallbackIAmHumanV2C4($event) {
    console.log(`I am human! My token is ${$event.token}`); // eslint-disable-line no-console
    console.log($event); // eslint-disable-line no-console
  }

  bindedCallbackIAmHumanV2IC4($event) {
    console.log(`I am human! My token is ${$event.token}`); // eslint-disable-line no-console
    console.log($event); // eslint-disable-line no-console
  }

  bindedCallbackIExpiredV2C4($event) {
    console.log('I am human no more!'); // eslint-disable-line no-console
    console.log($event); // eslint-disable-line no-console
  }

  publishExecuteV2IC2() {
    this.events.publish(`grecaptcha:execute:${this.idV2IC2}`);
  }

  publishExecuteV2IC3() {
    console.log(`grecaptcha:execute:${this.idV2IC3}`); // eslint-disable-line no-console
    this.events.publish(`grecaptcha:execute:${this.idV2IC3}`);
  }

  publishExecuteV2IC4() {
    this.events.publish(`grecaptcha:execute:${this.idV2IC4}`);
  }

  publishExecuteV3C2() {
    this.events.publish(`grecaptcha:execute:${this.idV3C2}`);
  }

  publishResetV2IC3() {
    console.log(`grecaptcha:reset:${this.idV2IC3}`); // eslint-disable-line no-console
    this.events.publish(`grecaptcha:reset:${this.idV2IC3}`);
  }
}
