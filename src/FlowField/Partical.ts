import { Vector } from 'p5';
import p5 from 'p5';
import { RGBA } from './FlowField';

class Partical {
  p5: p5;
  pos: Vector;
  vel: Vector;
  acc: Vector;
  maxSpeed: number = 4;
  prevPos: Vector;
  particalRGB: RGBA;

  constructor(p5: p5, RGBA: RGBA) {
    this.p5 = p5;
    this.pos = p5.createVector(p5.random(p5.width), p5.random(p5.height));
    this.vel = p5.createVector(0, 0);
    this.acc = p5.createVector(0, 0);
    this.prevPos = this.pos.copy();
    this.particalRGB = RGBA;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.limit(this.maxSpeed);
  }

  follow(flowfield: Vector[], scl: number, cols: number) {
    let x = this.p5.floor(this.pos.x / scl);
    let y = this.p5.floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = flowfield[index];

    this.applyForce(force);
  }

  applyForce(force: Vector) {
    this.acc.add(force);
  }

  show() {
    /*   this.p5.stroke(0, 10); */
    this.p5.stroke(
      this.particalRGB.R,
      this.particalRGB.G,
      this.particalRGB.B,
      this.particalRGB.A
    );

    this.p5.strokeWeight(1);
    this.p5.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > this.p5.width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = this.p5.width;
      this.updatePrev();
    }
    if (this.pos.y > this.p5.height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = this.p5.height;
      this.updatePrev();
    }
  }
}

export { Partical };
