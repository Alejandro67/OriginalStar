import { raDecToCartesian } from "@/app/utils/raDecToCartesian";
import * as THREE from "three";

export const createOsaMayor = (
  material: THREE.Material,
  exoplanet: { d: number }
) => {
  const alkaid = raDecToCartesian(
    206.885,
    49.3133333,
    30 * 326 - exoplanet.d * 326
  );
  const mizar = raDecToCartesian(
    200.98125,
    54.9252778,
    23 * 326 - exoplanet.d * 326
  );
  const alioth = raDecToCartesian(
    193.5072917,
    55.9598333,
    24 * 326 - exoplanet.d * 326
  );

  const megrez = raDecToCartesian(
    183.8566667,
    57.0325,
    25 * 326 - exoplanet.d * 326
  );

  const pheeda = raDecToCartesian(
    178.4575,
    53.6947222,
    26 * 326 - exoplanet.d * 326
  );

  const merak = raDecToCartesian(
    165.4604167,
    56.3825,
    24 * 326 - exoplanet.d * 326
  );

  const dubhe = raDecToCartesian(
    165.9320833,
    61.7508333,
    38 * 326 - exoplanet.d * 326
  );

  const pointsOsa = [];

  pointsOsa.push(new THREE.Vector3(alkaid.x, alkaid.y, alkaid.z));
  pointsOsa.push(new THREE.Vector3(mizar.x, mizar.y, mizar.z));
  pointsOsa.push(new THREE.Vector3(alioth.x, alioth.y, alioth.z));
  pointsOsa.push(new THREE.Vector3(megrez.x, megrez.y, megrez.z));
  pointsOsa.push(new THREE.Vector3(pheeda.x, pheeda.y, pheeda.z));
  pointsOsa.push(new THREE.Vector3(merak.x, merak.y, merak.z));
  pointsOsa.push(new THREE.Vector3(dubhe.x, dubhe.y, dubhe.z));
  pointsOsa.push(new THREE.Vector3(megrez.x, megrez.y, megrez.z));

  const geometryOsa = new THREE.BufferGeometry().setFromPoints(pointsOsa);
  const lineOsa = new THREE.Line(geometryOsa, material);

  return lineOsa;
};
