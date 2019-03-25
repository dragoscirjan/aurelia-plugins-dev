export class Component {
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
