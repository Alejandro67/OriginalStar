"use client"
import Image from "next/image";
import styles from "./page.module.css";

import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';

// JSON de ejemplo con las estrellas (x, y, z, name, description)
const starsData = [
  { x: 100, y: 50, z: -200, name: 'Alpha', description: 'A bright star in the sky' },
  { x: -150, y: 75, z: -300, name: 'Beta', description: 'A distant star' },
  { x: 200, y: -100, z: -500, name: 'Gamma', description: 'A star on the edge of the galaxy' },
  // ...
];

const StarMap: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const [clickedStar, setClickedStar] = useState<{ name: string; description: string } | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const sketch = (p: p5) => {
      let stars: { x: number; y: number; z: number; name: string; description: string }[] = [];

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
        stars = starsData; // Cargar las estrellas del JSON
      };

      p.draw = () => {
        p.background(0);
        p.orbitControl();

        // Dibujar estrellas
        p.stroke(255);
        p.fill(255);

        stars.forEach((star) => {
          p.push();
          p.translate(star.x, star.y, star.z);

          const d = p.dist(p.mouseX - p.width / 2, p.mouseY - p.height / 2, 0, star.x, star.y, star.z); // Distancia del mouse

          if (d < 10) { // Si el mouse está cerca de la estrella, cambiar su color
            p.fill(255, 0, 0);
          } else {
            p.fill(255);
          }

          p.sphere(5); // Dibujar una pequeña esfera para la estrella
          p.pop();
        });
      };

      p.mousePressed = () => {
        let foundStar: { name: string; description: string } | null = null;

        stars.forEach((star) => {
          const d = p.dist(p.mouseX, p.mouseY, 0, star.x, star.y, 0);

          if (d < 200) { // Si el click está cerca de una estrella
            foundStar = { name: star.name, description: star.description };
          }
        });

        if (foundStar) {
          setClickedStar(foundStar);
          setMousePosition({ x: p.mouseX, y: p.mouseY });
        } else {
          setClickedStar(null); // Si no hay estrella clickeada, ocultar la card
        }
      };
    };
    
    const myP5 = new p5(sketch, sketchRef.current!);

    return () => {
      myP5.remove();
    };
  }, []);

  return (
    <div>
      <div ref={sketchRef}></div>

      {/* Renderizar la card con la información de la estrella clickeada */}
      {clickedStar && (
        <div
          style={{
            position: 'absolute',
            left: `${mousePosition.x + 20}px`,
            top: `${mousePosition.y + 20}px`,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            pointerEvents: 'none', // La card no interfiere con los clicks
          }}
        >
          <h3>{clickedStar.name}</h3>
          <p>{clickedStar.description}</p>
        </div>
      )}
    </div>
  );
};

export default StarMap;

// export default function Home() {

//   return (
//     <div className={styles.page}>
      
//     </div>
//   );
// }
