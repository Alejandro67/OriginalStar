"use client";
import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { getStars } from "@/actions/getStars";
import { raDecToCartesian } from "../utils/raDecToCartesian";
import { calculateStarSize } from "../utils/calculateStarSize";
import { useSearchParams } from "next/navigation";
import { exoplanets } from "@/exoplanets";
import { COLOR_SCALE, getStarColor } from "../utils/getStarColor";

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
  const searchParams = useSearchParams();
  const exoplanetName = searchParams.get("exoplanet");
  const exoplanet = exoplanets.find((exo) => exo.name === exoplanetName) || {
    name: "Earth",
    raDeg: 0,
    decDeg: 0,
    d: 0,
  };
  const [p5Instance, setP5Instance] = useState<p5>();
  const exoplanetCoordinates = raDecToCartesian(
    exoplanet.raDeg,
    exoplanet.decDeg,
    exoplanet.d * 25
  );

  useEffect(() => {
    const loadStars = async () => {
      try {
        const stars: any[] = await getStars(0);
        const stars2: any[] = await getStars(180);
        const fullstars = stars.concat(stars2);

        const formatedStarts = fullstars.map((star) => {
          let parallaxInArcsec = star[4] / 1000; // Convertir a segundos de arco
          let distance = parallaxInArcsec > 0 ? 1 / parallaxInArcsec : Infinity;

          // distance *= 3.26; // Convertir parsecs a años luz (opcional)

          const starCoordinates = raDecToCartesian(
            star[2],
            star[3],
            star[23] * 25
            // distance * 25
          );
          const adjustedStarCoords = {
            x: starCoordinates.x - exoplanetCoordinates.x,
            y: starCoordinates.y - exoplanetCoordinates.y,
            z: starCoordinates.z - exoplanetCoordinates.z,
            color: getStarColor(star[20]),
          };

          // console.log(getStarColor(star[20]));

          return adjustedStarCoords;
        });
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
        color: number[];
      }[] = [];

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
        stars = newStars; // Cargar las estrellas del JSON

        // La cámara se posiciona en (initialX, initialY, initialZ) y mira hacia el origen (0, 0, 0)
        p.camera(1, 1, 1, 0, 0, 0, 0, 1, 0);
      };

      p.draw = () => {
        p.background(0);
        p.strokeWeight(10);
        p.stroke(114, 191, 120);
        p.point(0, 0, 0);
        p.point(
          -exoplanetCoordinates.x,
          -exoplanetCoordinates.y,
          -exoplanetCoordinates.z
        );

        // Dibujar ejes
        p.strokeWeight(2);

        //p.translate(-initialX, -initialY, -initialZ);
        p.orbitControl(1, 1, 0);
        // Eje X - Rojo
        // p.stroke(255, 0, 0); // Color rojo para el eje X
        // p.line(-10000, 0, 0, 10000, 0, 0); // Línea del eje X

        // // Eje Y - Verde
        // p.stroke(0, 255, 0); // Color verde para el eje Y
        // p.line(0, -10000, 0, 0, 10000, 0); // Línea del eje Y

        // // Eje Z - Azul
        // p.stroke(0, 0, 255); // Color azul para el eje Z
        // p.line(0, 0, -10000, 0, 0, 10000); // Línea del eje Z

        // Dibujar estrellas
        p.stroke(255);
        p.fill(255);
        p.strokeWeight(5);
        p.stroke(255, 255, 255);
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
          p.stroke(star.color[0], star.color[1], star.color[2]);
          p.sphere(0.1); //AQUI IRIA EL TAMAÑAO DE LA ESTRELLA
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
      setP5Instance(myP5);

      return () => {
        myP5.remove();
      };
    }
  }, [newStars]);

  const handleSave = () => {
    const p5Canvas = document.querySelector("canvas");
    if (p5Canvas && p5Instance) {
      // Usa la función p5.js saveCanvas para descargar la imagen

      p5Instance.saveCanvas(
        p5Canvas,
        `${exoplanet.name.replace(" ", "-")}_space`,
        "png"
      );
    }
  };

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
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: 0,
          left: 0,
          flexDirection: "column",
          gap: ".25em",
        }}
      >
        {COLOR_SCALE.map((color) => (
          <div style={{ display: "flex", alignItems: "center", gap: ".5em" }}>
            <div
              style={{
                width: "2em",
                height: ".85em",
                background: `rgb(${color.color.r},${color.color.g},${color.color.b})`,
              }}
            />
            <p style={{ fontSize: ".85em" }}>
              {color.minTemp} K - {color.maxTemp} K
            </p>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", top: "1em", right: "1em" }}>
        <button
          onClick={() => handleSave()}
          style={{
            padding: ".5em .75em",
            fontSize: "1em",
            cursor: "pointer",
            borderRadius: "4px",
            border: 0,
          }}
        >
          Take screenshot
        </button>
      </div>
    </div>
  );
};

export default StarMap;
