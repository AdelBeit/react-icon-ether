export default class Particle {
  x: number;
  y: number;
  dX: number;
  dY: number;
  size: number;
  maxSize: number;
  img: HTMLImageElement | null;
  tStep: number;
  t: number;

  constructor({
    x,
    y,
    dX,
    dY,
    size,
    img = null,
  }: {
    x: number;
    y: number;
    dX: number;
    dY: number;
    size: number;
    img?: HTMLImageElement;
  }) {
    this.x = x;
    this.y = y;
    this.dX = dX;
    this.dY = dY;
    this.size = size;
    this.maxSize = size;
    this.img = img;
    this.tStep = Math.random() * 0.01 + 0.01;
    this.t = Math.random() * 100;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.img)
      ctx.drawImage(
        this.img,
        this.x - this.size / 2,
        this.y - this.size / 2,
        this.size,
        this.size
      );
    else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = "#33FF00";
      ctx.fill();
    }
  }
  // TODO: a more interesting collision algo
  avoidCollision(pB: Particle) {
    const distance = ((pB.x - this.x) ** 2 + (pB.y - this.y) ** 2) ** 0.5;
    if (distance <= (this.size * 3) / 4 + (pB.size * 3) / 4) {
      this.flipX();
      pB.flipX();
      this.flipY();
      pB.flipY();
    }
  }

  flipX() {
    this.dX *= -1;
  }
  flipY() {
    this.dY *= -1;
  }

  update(ctx: CanvasRenderingContext2D) {
    // random movement pattern
    // boundary collision
    if (this.x > ctx.canvas.width - this.size / 2 || this.x < this.size / 2) {
      this.dX *= -1;
    }
    if (this.y > ctx.canvas.height - this.size / 2 || this.y < this.size / 2) {
      this.dY *= -1;
    }
    this.x += this.dX;
    this.y += this.dY;

    // figure 8 pattern
    this.t += this.tStep;

    // this.x =
    //   ctx.canvas.width * 0.425 * Math.sin(this.t / 2) + ctx.canvas.width * 0.5;
    // this.y =
    //   ctx.canvas.height * 0.2 * Math.sin(this.t) + ctx.canvas.height * 0.5;

    if (!this.img) this.flicker();
    this.draw(ctx);
  }

  flicker() {
    const radius = this.maxSize / 4 + (Math.random() * this.maxSize * 3) / 4;
    this.size = radius;
  }
}
