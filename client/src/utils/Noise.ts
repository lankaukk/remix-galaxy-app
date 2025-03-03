// Perlin Noise implementation
export class Noise {
  private perm: number[] = [];
  
  constructor(seed = Math.random()) {
    this.seed(seed);
  }

  private seed(seed: number): void {
    const p = new Array(256).fill(0).map((_, i) => i);
    
    for (let i = p.length - 1; i > 0; i--) {
      const n = Math.floor(seed * (i + 1));
      [p[i], p[n]] = [p[n], p[i]];
    }
    
    for (let i = 0; i < 512; i++) {
      this.perm[i] = p[i & 255];
    }
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(t: number, a: number, b: number): number {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number, y: number): number {
    const h = hash & 15;
    const grad = 1 + (h & 7);
    return ((h & 8) ? -grad : grad) * x + ((h & 4) ? -grad : grad) * y;
  }

  public perlin2(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);

    const u = this.fade(x);
    const v = this.fade(y);

    const A = this.perm[X] + Y;
    const B = this.perm[X + 1] + Y;

    return this.lerp(v,
      this.lerp(u,
        this.grad(this.perm[A], x, y),
        this.grad(this.perm[B], x - 1, y)
      ),
      this.lerp(u,
        this.grad(this.perm[A + 1], x, y - 1),
        this.grad(this.perm[B + 1], x - 1, y - 1)
      )
    );
  }
}
