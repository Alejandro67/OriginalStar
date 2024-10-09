import { raDecToCartesian } from "@/app/utils/raDecToCartesian";
import * as THREE from "three";

export const createOrion = (
  material: THREE.Material,
  exoplanet: { d: number }
) => {
  const betelgeuse = raDecToCartesian(
    88.7929167,
    7.4070417,
    197 * 326 - exoplanet.d * 326
  );
  const rigel = raDecToCartesian(
    78.6345833,
    -8.2016667,
    263.68 * 326 - exoplanet.d * 326
  );
  const bellatrix = raDecToCartesian(
    81.28275,
    6.3496944,
    73.584 * 326 - exoplanet.d * 326
  );
  const mintaka = raDecToCartesian(
    83.0016667,
    -0.2991667,
    280.54 * 326 - exoplanet.d * 326
  );
  const alnilam = raDecToCartesian(
    84.053375,
    -1.2019167,
    600 * 326 - exoplanet.d * 326
  );
  const alnitak = raDecToCartesian(
    85.1895833,
    -1.9427778,
    230 * 326 - exoplanet.d * 326
  );
  const saiph = raDecToCartesian(
    86.939125,
    -9.6696111,
    221.37 * 326 - exoplanet.d * 326
  );
  const meissa = raDecToCartesian(
    83.7845,
    9.9341667,
    337.26 * 326 - exoplanet.d * 326
  );
  // Bow
  const piOrionis1 = raDecToCartesian(
    73.7238333,
    10.1508306,
    35.7 * 326 - exoplanet.d * 326
  );
  const piOrionis2 = raDecToCartesian(
    72.653,
    8.9001778,
    69 * 326 - exoplanet.d * 326
  );
  const piOrionis3 = raDecToCartesian(
    72.4600417,
    6.9612722,
    8.07 * 326 - exoplanet.d * 326
  );
  const piOrionis4 = raDecToCartesian(
    72.8015,
    5.6051028,
    320 * 326 - exoplanet.d * 326
  );
  const piOrionis5 = raDecToCartesian(
    73.562875,
    2.4406722,
    410 * 326 - exoplanet.d * 326
  );
  const piOrionis6 = raDecToCartesian(
    74.6370833,
    1.7140139,
    290 * 326 - exoplanet.d * 326
  );
  // Arm
  const muOrionis = raDecToCartesian(
    90.5958333,
    9.6472778,
    47.523 * 326 - exoplanet.d * 326
  );
  const xiOrionis = raDecToCartesian(
    92.9849583,
    14.2087639,
    186 * 326 - exoplanet.d * 326
  );
  const nuOrionis = raDecToCartesian(
    91.893,
    14.7684722,
    158 * 326 - exoplanet.d * 326
  );
  const jiOrionis1 = raDecToCartesian(
    88.59575,
    20.2761667,
    8.7995 * 326 - exoplanet.d * 326
  );
  const jiOrionis2 = raDecToCartesian(
    90.9799167,
    20.1384444,
    1502.3 * 326 - exoplanet.d * 326
  );

  const pointsOrion = [];

  //Right Arm
  pointsOrion.push(new THREE.Vector3(jiOrionis2.x, jiOrionis2.y, jiOrionis2.z));
  pointsOrion.push(new THREE.Vector3(xiOrionis.x, xiOrionis.y, xiOrionis.z));
  pointsOrion.push(new THREE.Vector3(nuOrionis.x, nuOrionis.y, nuOrionis.z));
  pointsOrion.push(new THREE.Vector3(jiOrionis1.x, jiOrionis1.y, jiOrionis1.z));
  pointsOrion.push(new THREE.Vector3(nuOrionis.x, nuOrionis.y, nuOrionis.z));
  pointsOrion.push(new THREE.Vector3(xiOrionis.x, xiOrionis.y, xiOrionis.z));
  pointsOrion.push(new THREE.Vector3(muOrionis.x, muOrionis.y, muOrionis.z));

  //Top Body
  pointsOrion.push(new THREE.Vector3(betelgeuse.x, betelgeuse.y, betelgeuse.z));
  pointsOrion.push(new THREE.Vector3(meissa.x, meissa.y, meissa.z));
  pointsOrion.push(new THREE.Vector3(bellatrix.x, bellatrix.y, bellatrix.z));

  //Bow or shield or lion
  pointsOrion.push(new THREE.Vector3(piOrionis3.x, piOrionis3.y, piOrionis3.z));
  pointsOrion.push(new THREE.Vector3(piOrionis2.x, piOrionis2.y, piOrionis2.z));
  pointsOrion.push(new THREE.Vector3(piOrionis1.x, piOrionis1.y, piOrionis1.z));
  pointsOrion.push(new THREE.Vector3(piOrionis2.x, piOrionis2.y, piOrionis2.z));
  pointsOrion.push(new THREE.Vector3(piOrionis3.x, piOrionis3.y, piOrionis3.z));
  pointsOrion.push(new THREE.Vector3(piOrionis4.x, piOrionis4.y, piOrionis4.z));
  pointsOrion.push(new THREE.Vector3(piOrionis5.x, piOrionis5.y, piOrionis5.z));
  pointsOrion.push(new THREE.Vector3(piOrionis6.x, piOrionis6.y, piOrionis6.z));
  pointsOrion.push(new THREE.Vector3(piOrionis5.x, piOrionis5.y, piOrionis5.z));
  pointsOrion.push(new THREE.Vector3(piOrionis4.x, piOrionis4.y, piOrionis4.z));
  pointsOrion.push(new THREE.Vector3(piOrionis3.x, piOrionis3.y, piOrionis3.z));
  pointsOrion.push(new THREE.Vector3(bellatrix.x, bellatrix.y, bellatrix.z));

  //Rest of Body

  pointsOrion.push(new THREE.Vector3(mintaka.x, mintaka.y, mintaka.z));
  pointsOrion.push(new THREE.Vector3(rigel.x, rigel.y, rigel.z));
  pointsOrion.push(new THREE.Vector3(saiph.x, saiph.y, saiph.z));
  pointsOrion.push(new THREE.Vector3(alnitak.x, alnitak.y, alnitak.z));
  pointsOrion.push(new THREE.Vector3(alnilam.x, alnilam.y, alnilam.z));
  pointsOrion.push(new THREE.Vector3(mintaka.x, mintaka.y, mintaka.z));
  pointsOrion.push(new THREE.Vector3(alnilam.x, alnilam.y, alnilam.z));
  pointsOrion.push(new THREE.Vector3(alnitak.x, alnitak.y, alnitak.z));
  pointsOrion.push(new THREE.Vector3(betelgeuse.x, betelgeuse.y, betelgeuse.z));

  const geometryOrion = new THREE.BufferGeometry().setFromPoints(pointsOrion);
  const lineOrion = new THREE.Line(geometryOrion, material);

  return lineOrion;
};
