import environment from '../environment';

import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Component {
  /** @var {Array} */
  checked = [];

  renderedWithDelay = false;

  constructor(events) {
    this.events = events;

    this.recaptchaV2 = environment.siteKeys.v2;
    this.recaptchaV2Invisible = environment.siteKeys.v2i;
    this.recaptcha = environment.siteKeys.v3;

    setTimeout(() => {
      this.renderedWithDelay = true;
    }, 5000);
  }

  bind(...args) {
    window.callbackIAmHumanV2C2 = () => {
      console.log('I am human!');
    };
    window.callbackIAmHumanV2IC2 = () => {
      console.log('I am human (invisible)!');
    };
  }

  get isAuto() {
    return this.checked.filter(v => v === 'auto').length;
  }

  get isRemoveOne() {
    return this.checked.filter(v => v === 'remove-one').length;
  }

  get isRemoveAll() {
    return this.checked.filter(v => v === 'remove-all').length;
  }

  publishExecuteV2IC2() {
    this.events.publish(`grecaptcha:execute:${this.idV2IC2}`);
  }

  publishExecuteV2IC3() {
    this.events.publish(`grecaptcha:execute:${this.idV2IC3}`);
  }

  publishExecuteV3C2() {
    this.events.publish(`grecaptcha:execute:${this.idV3C2}`);
  }

  publishResetV2C1() {
    this.events.publish(`grecaptcha:reset:${this.idV2C1}`);
  }

  publishResetV2IC3() {
    this.events.publish(`grecaptcha:reset:${this.idV2IC3}`);
  }
}
