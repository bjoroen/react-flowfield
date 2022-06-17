import React, { useEffect, useRef } from 'react';
import p5, { Vector } from 'p5';
import Partical from './Partical';

export interface RGBA {
  R: number;
  G: number;
  B: number;
  A: number;
}

interface ComponentProps extends React.HTMLAttributes<HTMLCanvasElement> {
  lengthOfAnimation?: number;
  numberOfParticals?: number;
  particalColor?: RGBA;
  backgroundColor?: RGBA;
}

const FlowField: React.FC<ComponentProps> = ({
  lengthOfAnimation = 4000,
  numberOfParticals = 2000,
  backgroundColor = { R: 255, G: 255, B: 255, A: 255 },
  particalColor = { R: 0, G: 0, B: 0, A: 10 },
}: ComponentProps) => {
  const p5Sketch = useRef<HTMLDivElement | null>(null);

  let s = (p5: p5) => {
    const scl = 10;
    const inc: number = 0.1;
    let height = p5Sketch.current?.parentElement?.offsetHeight;
    let width = p5Sketch.current?.parentElement?.offsetWidth;
    let cols: number;
    let rows: number;
    let zoff: number = 0;
    let numberOfItterations: number = 0;
    let partical: Partical[] = [];
    let flowfield: Vector[];

    p5.setup = () => {
      if (height && width) p5.createCanvas(width, height);

      cols = p5.floor(p5.width / scl);
      rows = p5.floor(p5.height / scl);
      flowfield = new Array(cols * rows);

      for (let i = 0; i < numberOfParticals; i++) {
        partical[i] = new Partical(p5, particalColor);
      }

      p5.background(
        backgroundColor.R,
        backgroundColor.G,
        backgroundColor.B,
        backgroundColor.A
      );
    };

    p5.draw = () => {
      let yoff: number = 0;
      //Row Loop
      for (let y = 0; y < rows; y++) {
        let xoff: number = 0;
        //Cols loop
        for (let x = 0; x < cols; x++) {
          let index = x + y * cols;
          let angle: number = p5.noise(xoff, yoff, zoff) * p5.TWO_PI * 2;
          let v = Vector.fromAngle(angle);
          v.setMag(0.5);

          flowfield[index] = v;
          xoff += inc;
        }
        yoff += inc;
      }

      zoff += 0.0005;

      if (numberOfItterations < lengthOfAnimation) {
        for (let i = 0; i < partical.length - 1; i++) {
          partical[i].follow(flowfield, scl, cols);
          partical[i].update();
          partical[i].edges();
          partical[i].show();
        }
      }

      numberOfItterations += 1;
    };
  };

  let ignore = false; 
  useEffect(() => {
   

    if (p5Sketch.current && !ignore) new p5(s, p5Sketch.current);

    return () => {
      ignore = true;
    };
  }, [p5Sketch.current]);

  return <div ref={p5Sketch} />;
};

export { FlowField };
