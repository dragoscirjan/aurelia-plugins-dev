import { PLATFORM } from 'aurelia-pal';
import environment from '../environment';

export function configure(aurelia, callback) {
  aurelia.plugin(PLATFORM.moduleName('resources/elements/aurelia-content-loader/src'), callback);
  // aurelia.plugin(PLATFORM.moduleName('resources/elements/aurelia-content-loader/dist/es2015'), callback);
  // aurelia.plugin(PLATFORM.moduleName('aurelia-content-loader'), callback);

  // aurelia.plugin(PLATFORM.moduleName('resources/elements/aurelia-google-recaptcha/src'), callback);
  aurelia.plugin(PLATFORM.moduleName('resources/elements/aurelia-google-recaptcha/src'), config => {
    config.assign({
      siteKeys: environment.siteKeys
    });
  });
  // aurelia.plugin(PLATFORM.moduleName('resources/elements/aurelia-google-recaptcha/dist/es2015'), callback);
  // aurelia.plugin(PLATFORM.moduleName('aurelia-google-recaptcha'), callback);
}
