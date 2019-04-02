import environment from '../environment';
import { Component } from '../resources/component';

import { inject, LogManager } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { className } from 'amaranth-utils';

@inject(EventAggregator)
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

  constructor(events) {
    super();

    this.events = events;
    this.logger = LogManager.getLogger(className(this));

    this.recaptchaV2 = environment.siteKeys.v2;
    this.recaptchaV2Invisible = environment.siteKeys.v2i;
    this.recaptcha = environment.siteKeys.v3;

    setTimeout(() => {
      this.renderedWithDelay = true;
    }, 5000);
  }

  get isAuto() {
    return this.checked.filter(v => v === 'auto').length;
  }

  executeSimpleV2i() {
    this.logger.debug(`Calling grecaptcha:execute:${this.idSimpleV2i}`);
    this.events.publish(`grecaptcha:execute:${this.idSimpleV2i}`);
  }

  executeSimpleV3() {
    this.logger.debug(`Calling grecaptcha:execute:${this.idSimpleV3}`);
    this.events.publish(`grecaptcha:execute:${this.idSimpleV3}`);
  }

  resetSimpleV2() {
    this.logger.debug(`Calling grecaptcha:reset:${this.idSimpleV2i}`);
    this.events.publish(`grecaptcha:reset:${this.idSimpleV2}`);
  }

  resetSimpleV2i() {
    this.logger.debug(`Calling grecaptcha:reset:${this.idSimpleV2i}`);
    this.events.publish(`grecaptcha:reset:${this.idSimpleV2i}`);
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
