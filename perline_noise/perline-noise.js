let THE_SEED;
let border = 200;
let number_of_particles = 9000;
let number_of_particle_sets = 8;
let particle_sets = [];

let palette;

let nzoom = 10;

function setup() {
  createCanvas(1600, 800);
  THE_SEED = floor(random(9999999));
  randomSeed(THE_SEED);

  noFill();
  background("beige");
  stroke(20, 10);
  strokeWeight(0.7);
  smooth();

  palette = [color(255, 255, 255, 20), color(245, 245, 220, 20)];

  for (var j = 0; j < number_of_particle_sets; j++) {
    let ps = [];
    for (var i = 0; i < number_of_particles; i++) {
      ps.push(
        new Particle(
          randomGaussian(width / 2, 110),

          randomGaussian(height / 2, 110),
          random(TWO_PI)
        )
      );
    }
    particle_sets.push(ps);
  }
}

function draw() {
  particle_sets.forEach(function (particles, index) {
    particles.forEach(function (particle) {
      particle.update(index);
      particle.display(index);
    });
  });
}

class Particle {
  constructor(x, y, phi) {
    this.pos = createVector(x, y);
    this.angle = phi;
    this.val = 0;
  }

  update(index) {
    this.pos.x += cos(this.angle);
    this.pos.y += sin(this.angle);

    let nx = 1.8 * map(this.pos.x, 0, width, -1, 1);
    let ny = 1.8 * map(this.pos.y, 0, height, -1, 1);

    let n = createVector(nx, ny);

    let nval =
      (noise(n.x + 42, n.y - 23) +
        0.045 * (index - number_of_particle_sets / 2)) %
      1;

    this.angle += 3 * map(nval, 0, 1, -1, 1);
    this.val = nval;
  }

  display(index) {
    if (this.val > 0.482 && this.val < 0.518) {
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.angle);
      point(0, 0);
      pop();
    }
  }
}
