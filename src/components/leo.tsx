import { raDecToCartesian } from "@/app/utils/raDecToCartesian";
import * as THREE from "three";

export const createLeo = (
  material: THREE.Material,
  exoplanet: { d: number }
) => {
  const regulus = raDecToCartesian(
    152.0929583,
    11.9672083,
    24 * 326 - exoplanet.d * 326
  );
  const denebola = raDecToCartesian(
    177.2649167,
    14.5719833,
    11 * 326 - exoplanet.d * 326
  );
  const algieba = raDecToCartesian(
    154.9929167,
    19.8416667,
    40 * 326 - exoplanet.d * 326
  );
  const duhr = raDecToCartesian(
    168.5270833,
    20.5237222,
    17.7 * 326 - exoplanet.d * 326
  );
  const rasElasedAustralis = raDecToCartesian(
    146.4629167,
    23.7742778,
    77 * 326 - exoplanet.d * 326
  );
  const aldhafera = raDecToCartesian(
    154.1725833,
    23.4173056,
    79.7 * 326 - exoplanet.d * 326
  );
  const etaLeonis = raDecToCartesian(
    151.8333333,
    16.7627778,
    643.86 * 326 - exoplanet.d * 326
  );
  const rasalas = raDecToCartesian(
    148.1908333,
    26.0063889,
    38 * 326 - exoplanet.d * 326
  );
  const chertan = raDecToCartesian(
    168.56,
    15.4295833,
    50.6 * 326 - exoplanet.d * 326
  );

  const pointsLeo = [];

  pointsLeo.push(
    new THREE.Vector3(
      rasElasedAustralis.x,
      rasElasedAustralis.y,
      rasElasedAustralis.z
    )
  );
  pointsLeo.push(new THREE.Vector3(rasalas.x, rasalas.y, rasalas.z));
  pointsLeo.push(new THREE.Vector3(aldhafera.x, aldhafera.y, aldhafera.z));
  pointsLeo.push(new THREE.Vector3(algieba.x, algieba.y, algieba.z));
  pointsLeo.push(new THREE.Vector3(etaLeonis.x, etaLeonis.y, etaLeonis.z));
  pointsLeo.push(new THREE.Vector3(regulus.x, regulus.y, regulus.z));
  pointsLeo.push(new THREE.Vector3(chertan.x, chertan.y, chertan.z));
  pointsLeo.push(new THREE.Vector3(denebola.x, denebola.y, denebola.z));
  pointsLeo.push(new THREE.Vector3(duhr.x, duhr.y, duhr.z));
  pointsLeo.push(new THREE.Vector3(algieba.x, algieba.y, algieba.z));

  const geometryLeo = new THREE.BufferGeometry().setFromPoints(pointsLeo);
  const lineLeo = new THREE.Line(geometryLeo, material);

  return lineLeo;
};
