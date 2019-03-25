import 'resources/elements/aurelia-content-loader/src/styles.less';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import './style.less';

export class App {
  /** @var {Array} */
  appRoutes = [
    {
      route: [''],
      redirect: 'content-loader'
    },
    // demo app pages, comment and modify
    {
      moduleId: PLATFORM.moduleName('components/content-loader'),
      name: 'content-loader',
      nav: true,
      route: 'content-loader',
      title: 'Content Loader'
    },
    {
      moduleId: PLATFORM.moduleName('components/google-recaptcha'),
      name: 'google-recaptcha',
      nav: true,
      route: 'google-recaptcha',
      title: 'Google Recaptcha'
    }
  ];

  /**
   * Configure Application router
   * @method configureRouter
   * @param  {RouterConfiguration}  config
   * @param  {AppRouter}            router
   */
  configureRouter(config, router) {
    // force router to use / not /#
    config.options.pushState = true;
    // map unknown routes to a certain template
    // config.mapUnknownRoutes(PLATFORM.moduleName('templates/statuses/404'));
    // map routes
    config.map(this.appRoutes);
    // assing router
    this.router = router;
  }

  get routes() {
    return this.appRoutes.filter(r => r.name);
  }

  /** @var {Array} */
  checked = [];

  constructor() {}

  get isAnimated() {
    return this.checked.indexOf('animated') > -1;
  }

  get isBulletsAsSquares() {
    return this.checked.indexOf('bulletsAsSquares') > -1;
  }

  get isImageAsCircle() {
    return this.checked.indexOf('imageAsCircle') > -1;
  }
}
