import { raDecToCartesian } from "@/app/utils/raDecToCartesian";
import * as THREE from "three";

export const createCassiopeia = (
  material: THREE.Material,
  exoplanet: { d: number }
) => {
  const segin = raDecToCartesian(
    28.6029167,
    63.67,
    136 * 326 - exoplanet.d * 326
  );

  const ruchbah = raDecToCartesian(
    21.4541667,
    60.2352778,
    30 * 326 - exoplanet.d * 326
  );
  const cih = raDecToCartesian(
    14.1770833,
    60.7166667,
    187 * 326 - exoplanet.d * 326
  );
  const schedar = raDecToCartesian(
    10.1270833,
    56.5373611,
    70 * 326 - exoplanet.d * 326
  );
  const caph = raDecToCartesian(
    2.295,
    59.1497222,
    17 * 326 - exoplanet.d * 326
  );

  const pointsCassiopeia = [];

  pointsCassiopeia.push(new THREE.Vector3(segin.x, segin.y, segin.z));
  pointsCassiopeia.push(new THREE.Vector3(ruchbah.x, ruchbah.y, ruchbah.z));
  pointsCassiopeia.push(new THREE.Vector3(cih.x, cih.y, cih.z));
  pointsCassiopeia.push(new THREE.Vector3(schedar.x, schedar.y, schedar.z));
  pointsCassiopeia.push(new THREE.Vector3(caph.x, caph.y, caph.z));

  const geometryCassiopeia = new THREE.BufferGeometry().setFromPoints(
    pointsCassiopeia
  );
  const lineCassiopeia = new THREE.Line(geometryCassiopeia, material);

  return lineCassiopeia;
};
