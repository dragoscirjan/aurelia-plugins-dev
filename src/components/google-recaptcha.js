import environment from '../environment';
import { Component } from '../resources/component';

import { inject, LogManager } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { className } from 'amaranth-utils';

@inject(EventAggregator, ValidationControllerFactory)
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

  constructor(events, controllerFactory) {
    super();

    this.events = events;
    this.validator = controllerFactory.createForCurrentScope();
    this.logger = LogManager.getLogger(className(this));

    this.recaptchaV2 = environment.siteKeys.v2;
    this.recaptchaV2Invisible = environment.siteKeys.v2i;
    this.recaptcha = environment.siteKeys.v3;

    // Using ValidationController is not mandatory.
    ValidationRules.ensure('tokenValidateV2')
      .required()
      .withMessage('Please verify the V2 recaptcha.')
      .ensure('tokenValidateV2i')
      .required()
      .withMessage('Please verify the V2i recaptcha.')
      .ensure('tokenValidateV3')
      .required()
      .withMessage('Please verify the V3 recaptcha.')
      .on(this);

    setTimeout(() => {
      this.renderedWithDelay = true;
    }, 5000);
  }

  /**
   *
   * @param {String} id
   * @param {String} name
   */
  async execute(token) {
    const id = `id${token}`;
    const value = `token${token}`;

    this.logger.debug(`Calling grecaptcha:execute:${this[id] || token}`);
    this.events.publish(`grecaptcha:execute:${this[id] || token}`);

    return new Promise((resolve, reject) => {
      // constantly check for token
      const interval = setInterval(() => {
        if (this[value]) {
          this.logger.debug(`Discovered value for this.${value}`, this[value]);
          resolve();
          clearInterval(interval);
        }
      }, 500);
      // to the above check for a certain amount of time, then fail
      setTimeout(() => {
        if (interval && !this[value]) {
          this.logger.warn(`Search for this.${value} timed out`);
          clearInterval(interval);
          reject();
        }
      }, 20000);
    });
  }

  get isAuto() {
    return this.checked.filter(v => v === 'auto').length;
  }

  reset(token) {
    const id = `id${token}`;
    this.logger.debug(`Calling grecaptcha:reset:${this[id] || token}`);
    this.events.publish(`grecaptcha:reset:${this[id] || token}`);
  }

  async validate(token) {
    this.logger.debug('Attempting validation for:', this.tokenValidateV2, this.tokenValidateV2i, this.tokenValidateV3);
    await this.execute('ValidateV2i');
    await this.execute('ValidateV3');
    try {
      this.vResult = await this.validator.validate();
      this.logger.debug(this.vResult);
    } catch (e) {
      this.logger.error(e);
    }
  }

  // under this line everything is deprecated

  bind(...args) {
    window.callbackIAmHumanV2C2 = $event => {
      this.logger.debug('I am human!'); // eslint-disable-line no-console
      this.logger.debug($event); // eslint-disable-line no-console
    };
    window.callbackIAmHumanV2IC2 = $event => {
      this.logger.debug('I am human (invisible)!'); // eslint-disable-line no-console
      this.logger.debug($event); // eslint-disable-line no-console
    };
    window.callbackIAmHumanV2C4 = $event => {
      this.logger.debug('I am human no more!'); // eslint-disable-line no-console
      this.logger.debug($event); // eslint-disable-line no-console
    };
  }

  bindedCallbackIAmHumanV2C4($event) {
    this.logger.debug(`I am human! My token is ${$event.token}`); // eslint-disable-line no-console
    this.logger.debug($event); // eslint-disable-line no-console
  }

  bindedCallbackIAmHumanV2IC4($event) {
    this.logger.debug(`I am human! My token is ${$event.token}`); // eslint-disable-line no-console
    this.logger.debug($event); // eslint-disable-line no-console
  }

  bindedCallbackIExpiredV2C4($event) {
    this.logger.debug('I am human no more!'); // eslint-disable-line no-console
    this.logger.debug($event); // eslint-disable-line no-console
  }

  publishExecuteV2IC2() {
    this.events.publish(`grecaptcha:execute:${this.idV2IC2}`);
  }

  publishExecuteV2IC3() {
    this.logger.debug(`grecaptcha:execute:${this.idV2IC3}`); // eslint-disable-line no-console
    this.events.publish(`grecaptcha:execute:${this.idV2IC3}`);
  }

  publishExecuteV2IC4() {
    this.events.publish(`grecaptcha:execute:${this.idV2IC4}`);
  }

  publishExecuteV3C2() {
    this.events.publish(`grecaptcha:execute:${this.idV3C2}`);
  }

  publishResetV2IC3() {
    this.logger.debug(`grecaptcha:reset:${this.idV2IC3}`); // eslint-disable-line no-console
    this.events.publish(`grecaptcha:reset:${this.idV2IC3}`);
  }
}
