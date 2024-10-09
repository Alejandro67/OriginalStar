import { raDecToCartesian } from "@/app/utils/raDecToCartesian";
import * as THREE from "three";

export const createScorpion = (
  material: THREE.Material,
  exoplanet: { d: number }
) => {
  const antares = raDecToCartesian(
    247.35,
    -26.4319444,
    168.63 * 326 - exoplanet.d * 326
  );
  const acrab = raDecToCartesian(
    241.3592917,
    -19.8054528,
    162.5 * 326 - exoplanet.d * 326
  );
  const dschubba = raDecToCartesian(
    240.083375,
    -22.6216111,
    123.25 * 326 - exoplanet.d * 326
  );
  const wei = raDecToCartesian(
    252.540875,
    -34.2935,
    19.929 * 326 - exoplanet.d * 326
  );
  const zetaScorpii1 = raDecToCartesian(
    253.498875,
    -42.3620278,
    1747.6 * 326 - exoplanet.d * 326
  );
  const etaScorpii = raDecToCartesian(
    258.0382917,
    -43.2391944,
    21.953 * 326 - exoplanet.d * 326
  );
  const sargas = raDecToCartesian(
    264.33,
    -42.9977778,
    82.782 * 326 - exoplanet.d * 326
  );
  const iotaScorpii1 = raDecToCartesian(
    266.89625,
    -40.1269444,
    548.82 * 326 - exoplanet.d * 326
  );
  const shaula = raDecToCartesian(
    263.4021667,
    -37.1038333,
    174.76 * 326 - exoplanet.d * 326
  );
  const girtab = raDecToCartesian(
    265.6219583,
    -39.0299722,
    141.04 * 326 - exoplanet.d * 326
  );
  const muScorpii1 = raDecToCartesian(
    252.7592917,
    -38.0473889,
    251.41 * 326 - exoplanet.d * 326
  );
  const piScorpii = raDecToCartesian(
    239.7129583,
    -26.1141111,
    159.43 * 326 - exoplanet.d * 326
  );
  const alNiyat = raDecToCartesian(
    245.2970833,
    -25.5927778,
    225.35 * 326 - exoplanet.d * 326
  );
  const tauScorpii = raDecToCartesian(
    248.970625,
    -28.2160278,
    131.84 * 326 - exoplanet.d * 326
  );
  const lesath = raDecToCartesian(
    262.691,
    -37.2958056,
    159.13 * 326 - exoplanet.d * 326
  );

  const pointsScorpion = [];

  pointsScorpion.push(new THREE.Vector3(lesath.x, lesath.y, lesath.z));
  pointsScorpion.push(new THREE.Vector3(shaula.x, shaula.y, shaula.z));
  pointsScorpion.push(new THREE.Vector3(girtab.x, girtab.y, girtab.z));
  pointsScorpion.push(
    new THREE.Vector3(iotaScorpii1.x, iotaScorpii1.y, iotaScorpii1.z)
  );
  pointsScorpion.push(new THREE.Vector3(sargas.x, sargas.y, sargas.z));
  pointsScorpion.push(
    new THREE.Vector3(etaScorpii.x, etaScorpii.y, etaScorpii.z)
  );
  pointsScorpion.push(
    new THREE.Vector3(zetaScorpii1.x, zetaScorpii1.y, zetaScorpii1.z)
  );
  pointsScorpion.push(
    new THREE.Vector3(muScorpii1.x, muScorpii1.y, muScorpii1.z)
  );
  pointsScorpion.push(new THREE.Vector3(wei.x, wei.y, wei.z));
  pointsScorpion.push(
    new THREE.Vector3(tauScorpii.x, tauScorpii.y, tauScorpii.z)
  );
  pointsScorpion.push(new THREE.Vector3(antares.x, antares.y, antares.z));
  pointsScorpion.push(new THREE.Vector3(alNiyat.x, alNiyat.y, alNiyat.z));
  pointsScorpion.push(new THREE.Vector3(acrab.x, acrab.y, acrab.z));
  pointsScorpion.push(new THREE.Vector3(alNiyat.x, alNiyat.y, alNiyat.z));
  pointsScorpion.push(new THREE.Vector3(dschubba.x, dschubba.y, dschubba.z));
  pointsScorpion.push(new THREE.Vector3(alNiyat.x, alNiyat.y, alNiyat.z));
  pointsScorpion.push(new THREE.Vector3(piScorpii.x, piScorpii.y, piScorpii.z));

  const geometryScorpion = new THREE.BufferGeometry().setFromPoints(
    pointsScorpion
  );
  const lineScorpion = new THREE.Line(geometryScorpion, material);

  return lineScorpion;
};
