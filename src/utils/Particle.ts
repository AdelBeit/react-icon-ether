/**
 * Particle
 * @description - circle canvas shape, provide <img /> for img entities on canvas
 * @property {boolean} shouldFlicker - when true, circle shapes will flicker 20% of the time, does not affect img particles.
 */
export default class Particle {
  x: number;
  y: number;
  dX: number;
  dY: number;
  size: number;
  maxSize: number;
  img: HTMLImageElement | undefined;
  tStep: number;
  t: number;
  color: string;
  shouldFlicker: boolean;

  constructor({
    x,
    y,
    dX,
    dY,
    size,
    img = undefined,
    color = "#33FF00",
    flicker = false,
  }: {
    x: number;
    y: number;
    dX: number;
    dY: number;
    size: number;
    img?: HTMLImageElement | undefined;
    color?: string;
    flicker?: boolean;
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
    this.color = color;
    this.shouldFlicker = flicker;
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
      ctx.fillStyle = this.color;
      ctx.fill();
    }
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

    if (!this.img && this.shouldFlicker && Math.random() < 0.2) {
      this.flicker();
    }
    this.draw(ctx);
  }

  flicker() {
    const radius = this.maxSize / 4 + (Math.random() * this.maxSize * 3) / 4;
    this.size = radius;
  }
}
