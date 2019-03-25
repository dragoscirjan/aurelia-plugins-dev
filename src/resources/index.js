import { PLATFORM } from 'aurelia-pal';

export function configure(aurelia, callback) {
  aurelia.plugin(PLATFORM.moduleName('resources/elements/aurelia-content-loader/src'), callback);
  // aurelia.plugin(PLATFORM.moduleName('resources/elements/aurelia-content-loader/dist/es2015'), callback);
  // aurelia.plugin(PLATFORM.moduleName('aurelia-content-loader'), callback);
}
