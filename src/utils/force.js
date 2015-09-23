import PIXI from 'pixi.js';

export default class Force {
  /**
   * Create a new force.
   *
   * @param {PIXI.DisplayObject} clip
   * @param {number} x
   * @param {number} y
   * @param {object} options
   * @param {PIXI.Point} options.limit
   */

  constructor(clip, x, y, {limit = new PIXI.Point(0, 0)} = {}) {
    this.clip = clip;
    this.power = new PIXI.Point(x, y);
    this.value = new PIXI.Point(0, 0);
    this.limit = limit;
    this.exerting = true;
  }

  /**
   * Apply force.
   *
   * @param {number} dt
   */

  update(dt) {
    this.exert(dt);

    this.clip.x += this.value.x;
    this.clip.y += this.value.y;
  }

  exert(dt) {
    if (!this.exerting)
      return;

    const step = new PIXI.Point(this.power.x * dt, this.power.y * dt);

    this.value.x += step.x;
    this.value.y += step.y;

    if (
      (this.limit.y > 0 && this.value.y > this.limit.y) ||
      (this.limit.y < 0 && this.value.y < this.limit.y)
    ) {
      this.limited = true;
      this.value.y = this.limit.y;
    }

    if (
      (this.limit.x > 0 && this.value.x > this.limit.x) ||
      (this.limit.x < 0 && this.value.x < this.limit.x)
    ) {
      this.limited = true;
      this.value.x = this.limit.x;
    }
  }

  /**
   * Reset force value.
   */

  reset() {
    this.value.x = this.value.y = 0;
    this.limited = false;
  }
}