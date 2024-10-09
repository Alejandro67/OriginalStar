"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { getStars } from "@/actions/getStars";
import { raDecToCartesian } from "../utils/raDecToCartesian";
import { getStarColor } from "../utils/getStarColor";
import { useSearchParams } from "next/navigation";
import { exoplanets } from "@/exoplanets";
import { COLOR_SCALE } from "../utils/getStarColor";
import { createOsaMinor } from "@/components/osaMinor";
import { createOsaMayor } from "@/components/osaMayor";
import { createCassiopeia } from "@/components/cassiopeia";
import { createLeo } from "@/components/leo";
import { createTaurus } from "@/components/taurus";
import { createScorpion } from "@/components/scorpion";
import { createOrion } from "@/components/orion";
import { calculeStarRadius } from "../utils/calculeStarRadius";
import { calculeLum } from "../utils/calculeLum";

export const dynamic = "force-dynamic";

const StarMap: React.FC = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StarMapWithSearchParams sketchRef={sketchRef} />
    </Suspense>
  );
};

const ConstellationData = ({
  color,
  name,
}: {
  color: string;
  name: string;
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: ".5em" }}>
      <div
        style={{
          width: "2em",
          height: ".85em",
          background: color,
        }}
      />
      <p style={{ color: "white", fontSize: ".85em" }}>{name}</p>
    </div>
  );
};

const StarMapWithSearchParams = ({
  sketchRef,
}: {
  sketchRef: React.RefObject<HTMLDivElement>;
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const searchParams = useSearchParams();
  const exoplanetName = searchParams.get("exoplanet");
  const exoplanet = exoplanets.find((exo) => exo.name === exoplanetName) || {
    name: "Earth",
    raDeg: 0,
    decDeg: 0,
    d: 0,
  };
  const [loading, setLoading] = useState<boolean>(true);

  const exoplanetCoordinates = raDecToCartesian(
    exoplanet.raDeg,
    exoplanet.decDeg,
    exoplanet.d * 326
  );

  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;

    const initThreeJS = async () => {
      // Crear la escena
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);

      // Crear la cámara
      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        10000000
      );
      camera.position.set(1, 1, 1);

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      sketchRef.current?.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.minPolarAngle = -Infinity;
      controls.maxPolarAngle = Infinity;
      controls.minAzimuthAngle = -Infinity;
      controls.maxAzimuthAngle = Infinity;
      controls.update();

      const geometryEarth = new THREE.SphereGeometry(3);
      const materialEarth = new THREE.MeshBasicMaterial({
        color: new THREE.Color(238 / 255, 102 / 255, 166 / 255),
      });
      const earthMesh = new THREE.Mesh(geometryEarth, materialEarth);
      earthMesh.position.set(
        -exoplanetCoordinates.x,
        -exoplanetCoordinates.y,
        -exoplanetCoordinates.z
      );
      scene.add(earthMesh);

      const materialExo = new THREE.MeshBasicMaterial({
        color: new THREE.Color(203 / 255, 128 / 255, 171 / 255),
      });
      const exo = new THREE.Mesh(geometryEarth, materialExo);
      exo.position.set(0, 0, 0);
      scene.add(exo);

      // Cargar las estrellas
      const stars = await loadStars();
      stars.forEach((star) => {
        const geometry = new THREE.SphereGeometry(star.radius);
        const color = new THREE.Color(
          star.color[0] / 255,
          star.color[1] / 255,
          star.color[2] / 255
        );
        const material = new THREE.MeshStandardMaterial({
          color,
          transparent: true,
          opacity: Math.min(star.lum / 10, 1),
          emissive: color,
          emissiveIntensity: star.lum / 10,
        });
        const starMesh = new THREE.Mesh(geometry, material);
        starMesh.position.set(star.x, star.y, star.z);
        scene.add(starMesh);
      });

      const materialOrion = new THREE.LineBasicMaterial({
        color: 0x0000ff,
      });
      const lineOrion = createOrion(materialOrion, exoplanet);
      scene.add(lineOrion);

      const materialOsaMayor = new THREE.LineBasicMaterial({
        color: 0x0088ff,
      });
      const lineOsaMayor = createOsaMayor(materialOsaMayor, exoplanet);
      scene.add(lineOsaMayor);

      const materialOsaMinor = new THREE.LineBasicMaterial({
        color: 0x0044ff,
      });
      const lineOsaMinor = createOsaMinor(materialOsaMinor, exoplanet);
      scene.add(lineOsaMinor);

      const materialCassiopeia = new THREE.LineBasicMaterial({
        color: 0x00bbff,
      });
      const lineCassiopeia = createCassiopeia(materialCassiopeia, exoplanet);
      scene.add(lineCassiopeia);

      const materialLeo = new THREE.LineBasicMaterial({
        color: 0x4400ff,
      });
      const lineLeo = createLeo(materialLeo, exoplanet);
      scene.add(lineLeo);

      const materialTaurus = new THREE.LineBasicMaterial({
        color: 0x8800ff,
      });
      const lineTaurus = createTaurus(materialTaurus, exoplanet);
      scene.add(lineTaurus);

      const materialScorpion = new THREE.LineBasicMaterial({
        color: 0x8844ff,
      });
      const lineScorpion = createScorpion(materialScorpion, exoplanet);
      scene.add(lineScorpion);

      // Render loop
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
      const captureScreenshot = () => {
        requestAnimationFrame(() => {
          const imgData = renderer.domElement.toDataURL("image/png"); // Captura el contenido del canvas
          const link = document.createElement("a");
          link.href = imgData;
          link.download = "screenshot.png"; // Nombre del archivo
          link.click(); // Iniciar la descarga
        });
      };

      if (buttonRef.current !== null) {
        buttonRef.current.onclick = captureScreenshot;
      }

      setLoading(false);
    };

    const loadStars = async () => {
      try {
        const stars: any[] = await getStars(0);
        const stars2: any[] = await getStars(180);
        const fullstars = stars.concat(stars2);

        return fullstars.map((star) => {
          let parallaxInArcsec = star[4] / 1000; // Convertir a segundos de arco
          let distance = parallaxInArcsec > 0 ? 1 / parallaxInArcsec : Infinity;

          const starCoordinates = raDecToCartesian(
            star[2],
            star[3],
            star[23] * 326 - exoplanet.d * 326
          );
          return {
            x: starCoordinates.x,
            y: starCoordinates.y,
            z: starCoordinates.z,
            color: getStarColor(star[20]),
            radius: calculeStarRadius(
              star[8],
              star[23] * 326 - exoplanet.d * 326,
              star[20]
            ),
            lum: calculeLum(star[8], star[23] * 326 - exoplanet.d * 326),
          };
        });
      } catch (e) {
        console.error(e);
        return [];
      }
    };

    initThreeJS();

    return () => {
      // Cleanup Three.js
      while (sketchRef.current?.firstChild) {
        sketchRef.current.removeChild(sketchRef.current.firstChild);
      }
    };
  }, []);

  return (
    <div>
      <div ref={sketchRef} style={{ background: "#000000" }} />
      {!loading && (
        <>
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
            {COLOR_SCALE.map((color, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: ".5em" }}
              >
                <div
                  style={{
                    width: "2em",
                    height: ".85em",
                    background: `rgb(${color.color.r},${color.color.g},${color.color.b})`,
                  }}
                />
                <p style={{ color: "white", fontSize: ".85em" }}>
                  {color.minTemp} K - {color.maxTemp} K
                </p>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: 0,
              right: 0,
              flexDirection: "column",
              gap: ".25em",
            }}
          >
            <ConstellationData color="#0000ff" name={"Orion"} />
            <ConstellationData color="#0088ff" name={"Ursa Major"} />
            <ConstellationData color="#0044ff" name={"Ursa Minor"} />
            <ConstellationData color="#00bbff" name={"Cassiopeia"} />
            <ConstellationData color="#4400ff" name={"Leo"} />
            <ConstellationData color="#8800ff" name={"Taurus"} />
            <ConstellationData color="#8844ff" name={"Scorpion"} />
          </div>
          <div style={{ position: "absolute", top: "1em", right: "1em" }}>
            <button
              ref={buttonRef}
              style={{
                padding: ".5em .75em",
                fontSize: "1em",
                cursor: "pointer",
                borderRadius: "4px",
                border: 0,
                backgroundColor: "white",
              }}
            >
              Take screenshot
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StarMap;
