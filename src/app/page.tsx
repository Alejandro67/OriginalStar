"use client";
import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { getStars } from "@/actions/getStars";
import { raDecToCartesian } from "./utils/raDecToCartesian";

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
  // ...
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
        let xd2 = raDecToCartesian(2185.17879166666665,17.79325277777778, 93.1846*30)
        const stars:any[] = await getStars(0);
        const stars2:any[] = await getStars(180)
        const fullstars = stars.concat(stars2)
        console.log(stars[0]);

        // const exoplanetCoordinates = raDecToCartesian(0, 0, 0);
        // console.log(exoplanetCoordinates);
        const formatedStarts = fullstars.map((star) => {
          let parallaxInArcsec = star[4] / 1000; // Convertir a segundos de arco
          let distance = parallaxInArcsec > 0 ? 1 / parallaxInArcsec : Infinity;

          // distance *= 3.26; // Convertir parsecs a años luz (opcional)

          const starCoordinates = raDecToCartesian(
            star[2],
            star[3],
            star[23] *30
            // distance * 30
          );
          //console.log(starCoordinates);
          Math.PI;
          const adjustedStarCoords = {
            x: starCoordinates.x -xd2.x,
            y: starCoordinates.y - xd2.y,
            z: starCoordinates.z - xd2.z,
          };

          return adjustedStarCoords;
        });
        //console.log(formatedStarts);
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
        let xd2 = raDecToCartesian(242.6020833, 43.8163611,17.9323*50)

        const initialX = xd2.x;
        const initialY = xd2.y;
        const initialZ = xd2.z;
        
        // La cámara se posiciona en (initialX, initialY, initialZ) y mira hacia el origen (0, 0, 0)
        p.camera(1,1,1, 0, 0, 0, 0, 1, 0);
      };

      p.draw = () => {
        let xd2 = raDecToCartesian(2185.17879166666665,17.79325277777778, 93.1846*30)
        p.background(0);
        const initialX = xd2.x;
        const initialY = xd2.y;
        const initialZ = xd2.z;
        p.strokeWeight(10)
        p.stroke(255,0,0)
        p.point(0,0,0)
        p.point(-xd2.x, -xd2.y, -xd2.z)

        // Dibujar ejes
        p.strokeWeight(2);

        //p.translate(-initialX, -initialY, -initialZ);
        p.orbitControl(1, 1, 0);  

        // Eje X - Rojo
        p.stroke(255, 0, 0); // Color rojo para el eje X
        p.line(-10000, 0, 0, 10000, 0, 0); // Línea del eje X

        // Eje Y - Verde
        p.stroke(0, 255, 0); // Color verde para el eje Y
        p.line(0, -10000, 0, 0, 10000, 0); // Línea del eje Y

        // Eje Z - Azul
        p.stroke(0, 0, 255); // Color azul para el eje Z
        p.line(0, 0, -10000, 0, 0, 10000); // Línea del eje Z

        // Dibujar estrellas
        p.stroke(255);
        p.fill(255);
        p.strokeWeight(5)
        p.stroke(255,255,255)
        stars.forEach((star) => {
          p.push();
          p.translate(star.x, star.y, star.z);

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
          p.sphere(0.1); // Dibujar una pequeña esfera para la estrella
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
