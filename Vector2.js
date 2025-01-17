export class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }
  sub(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  }
  mul(n) {
    this.x *= n;
    this.y *= n;
    return this;
  }
  getMul(n) {
    return new Vector2(this.x * n, this.y * n);
  }
}
