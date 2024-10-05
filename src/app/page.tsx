"use client";
import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { getStars } from "@/actions/getStars";

// JSON de ejemplo con las estrellas (x, y, z, name, description)
const starsData = [
  {
    x: 100,
    y: 50,
    z: -200,
    name: "Alpha",
    description: "A bright star in the sky",
  },
  { x: -150, y: 75, z: -300, name: "Beta", description: "A distant star" },
  {
    x: 200,
    y: -100,
    z: -500,
    name: "Gamma",
    description: "A star on the edge of the galaxy",
  },
  // Más estrellas
];

const StarMap: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const [clickedStar, setClickedStar] = useState<{
    name: string;
    description: string;
  } | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [newStars, setStars] = useState<any[]>([]);

  useEffect(() => {
    const loadStars = async () => {
      try {
        const stars = await getStars();
        console.log(stars[0]);
        const formatedStarts = stars.map((star) => {
          const raRad = (185.17879166666665 * Math.PI) / 180;
          const decRad = (17.79325277777778 * Math.PI) / 180;
          const distance = star[23];

          const x = distance * Math.cos(decRad) * Math.cos(raRad);
          const y = distance * Math.cos(decRad) * Math.sin(raRad);
          const z = distance * Math.sin(decRad);
          return { x, y, z };
        });
        console.log(formatedStarts);
        setStars(formatedStarts);
      } catch (e) {
        console.log(e);
      }
    };

    loadStars();
  }, []);

  useEffect(() => {
    const sketch = (p: p5) => {
      let stars: {
        x: number;
        y: number;
        z: number;
      }[] = [];

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
        stars = newStars; // Cargar las estrellas del JSON
      };

      p.draw = () => {
        p.background(0);
        p.orbitControl();

        // Dibujar estrellas
        p.stroke(255);
        p.fill(255);

        stars.forEach((star) => {
          p.translate(star.x, star.y, star.z);
          p.push();

          // const d = p.dist(
          //   p.mouseX - p.width / 2,
          //   p.mouseY - p.height / 2,
          //   0,
          //   star.x,
          //   star.y,
          //   star.z
          // ); // Distancia del mouse

          // if (d < 10) {
          //   // Si el mouse está cerca de la estrella, cambiar su color
          //   p.fill(255, 0, 0);
          // } else {
          //   p.fill(255);
          // }

          p.sphere(100); // Dibujar una pequeña esfera para la estrella
          p.pop();
        });
      };

      // p.mousePressed = () => {
      //   let foundStar: { name: string; description: string } | null = null;

      //   stars.forEach((star) => {
      //     const d = p.dist(p.mouseX, p.mouseY, 0, star.x, star.y, 0);

      //     if (d < 200) {
      //       // Si el click está cerca de una estrella
      //       foundStar = { name: star.name, description: star.description };
      //     }
      //   });

      //   if (foundStar) {
      //     setClickedStar(foundStar);
      //     setMousePosition({ x: p.mouseX, y: p.mouseY });
      //   } else {
      //     setClickedStar(null); // Si no hay estrella clickeada, ocultar la card
      //   }
      // };
    };

    let myP5: p5;
    if (newStars.length > 0) {
      myP5 = new p5(sketch, sketchRef.current!);
      return () => {
        myP5.remove();
      };
    }
  }, [newStars]);

  return (
    <div>
      <div ref={sketchRef}></div>

      {/* Renderizar la card con la información de la estrella clickeada */}
      {/* {clickedStar && (
        <div
          style={{
            position: "absolute",
            left: `${mousePosition.x + 20}px`,
            top: `${mousePosition.y + 20}px`,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            pointerEvents: "none", // La card no interfiere con los clicks
          }}
        >
          <h3>{clickedStar.name}</h3>
          <p>{clickedStar.description}</p>
        </div>
      )} */}
    </div>
  );
};

export default StarMap;
