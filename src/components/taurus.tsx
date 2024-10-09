import { raDecToCartesian } from "@/app/utils/raDecToCartesian";
import * as THREE from "three";

export const createTaurus = (
  material: THREE.Material,
  exoplanet: { d: number }
) => {
  const aldebaran = raDecToCartesian(
    68.98,
    16.5093056,
    19.96 * 326 - exoplanet.d * 326
  );
  const elnath = raDecToCartesian(
    81.5729583,
    28.6074444,
    40.165 * 326 - exoplanet.d * 326
  );
  const zetaTauri = raDecToCartesian(
    84.4111667,
    21.1425833,
    127.85 * 326 - exoplanet.d * 326
  );
  const hyadumI = raDecToCartesian(
    64.9483333,
    15.6275,
    47.217 * 326 - exoplanet.d * 326
  );
  const ain = raDecToCartesian(
    67.1541667,
    19.1804444,
    47.523 * 326 - exoplanet.d * 326
  );
  const lambdaTauri = raDecToCartesian(
    60.17,
    12.4902778,
    113.44 * 326 - exoplanet.d * 326
  );
  const xiTauri = raDecToCartesian(
    51.7922917,
    9.7326667,
    68.066 * 326 - exoplanet.d * 326
  );
  const hyadumII = raDecToCartesian(
    65.73375,
    17.5425,
    46.91 * 326 - exoplanet.d * 326
  );
  const thetaTauri1 = raDecToCartesian(
    67.14375,
    15.9621944,
    47.217 * 326 - exoplanet.d * 326
  );

  const alcione = raDecToCartesian(
    56.87125,
    24.105,
    134.9 * 326 - exoplanet.d * 326
  );

  const pointsTaurus = [];

  pointsTaurus.push(new THREE.Vector3(elnath.x, elnath.y, elnath.z));
  pointsTaurus.push(new THREE.Vector3(ain.x, ain.y, ain.z));
  pointsTaurus.push(new THREE.Vector3(hyadumII.x, hyadumII.y, hyadumII.z));
  pointsTaurus.push(new THREE.Vector3(alcione.x, alcione.y, alcione.z));
  pointsTaurus.push(new THREE.Vector3(hyadumII.x, hyadumII.y, hyadumII.z));
  pointsTaurus.push(new THREE.Vector3(hyadumI.x, hyadumI.y, hyadumI.z));
  pointsTaurus.push(
    new THREE.Vector3(lambdaTauri.x, lambdaTauri.y, lambdaTauri.z)
  );
  pointsTaurus.push(new THREE.Vector3(xiTauri.x, xiTauri.y, xiTauri.z));
  pointsTaurus.push(
    new THREE.Vector3(lambdaTauri.x, lambdaTauri.y, lambdaTauri.z)
  );
  pointsTaurus.push(new THREE.Vector3(hyadumI.x, hyadumI.y, hyadumI.z));
  pointsTaurus.push(
    new THREE.Vector3(thetaTauri1.x, thetaTauri1.y, thetaTauri1.z)
  );
  pointsTaurus.push(new THREE.Vector3(aldebaran.x, aldebaran.y, aldebaran.z));
  pointsTaurus.push(new THREE.Vector3(zetaTauri.x, zetaTauri.y, zetaTauri.z));

  const geometryTaurus = new THREE.BufferGeometry().setFromPoints(pointsTaurus);
  const lineTaurus = new THREE.Line(geometryTaurus, material);

  return lineTaurus;
};
