import environment from '../environment';
import { Component } from '../resources/component';

import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class GoogleRecaptcha extends Component {
  /** @var {Array} */
  checked = [];

  renderedWithDelay = false;

  constructor(events) {
    super();

    this.events = events;

    this.recaptchaV2 = environment.siteKeys.v2;
    this.recaptchaV2Invisible = environment.siteKeys.v2i;
    this.recaptcha = environment.siteKeys.v3;

    setTimeout(() => {
      this.renderedWithDelay = true;
    }, 5000);
  }

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

  get isAuto() {
    return this.checked.filter(v => v === 'auto').length;
  }

  get isRemoveOne() {
    return this.checked.filter(v => v === 'remove-one').length;
  }

  get isRemoveAll() {
    return this.checked.filter(v => v === 'remove-all').length;
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
    this.events.publish(`grecaptcha:execute:${this.idV2IC3}`);
  }

  publishExecuteV2IC4() {
    this.events.publish(`grecaptcha:execute:${this.idV2IC4}`);
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
