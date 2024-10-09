import { raDecToCartesian } from "@/app/utils/raDecToCartesian";
import * as THREE from "three";

export const createOsaMinor = (
  material: THREE.Material,
  exoplanet: { d: number }
) => {
  const polaris = raDecToCartesian(
    38.975,
    89.2802778,
    132 * 326 - exoplanet.d * 326
  );

  const kochab = raDecToCartesian(
    222.67625,
    74.1555556,
    39 * 326 - exoplanet.d * 326
  );

  const pherkad = raDecToCartesian(
    230.182125,
    71.8340278,
    147 * 326 - exoplanet.d * 326
  );

  const yildun = raDecToCartesian(
    263.05375,
    86.5863889,
    56 * 326 - exoplanet.d * 326
  );

  const ursaeMinoris = raDecToCartesian(
    251.4920833,
    82.0372222,
    106 * 326 - exoplanet.d * 326
  );

  const alifaAlFarkadain = raDecToCartesian(
    236.0146667,
    77.7945,
    115 * 326 - exoplanet.d * 326
  );

  const anwarAlFarkadain = raDecToCartesian(
    244.375125,
    75.7552778,
    30 * 326 - exoplanet.d * 326
  );

  const pointsOsaMinor = [];

  pointsOsaMinor.push(new THREE.Vector3(polaris.x, polaris.y, polaris.z));
  pointsOsaMinor.push(new THREE.Vector3(yildun.x, yildun.y, yildun.z));
  pointsOsaMinor.push(
    new THREE.Vector3(ursaeMinoris.x, ursaeMinoris.y, ursaeMinoris.z)
  );
  pointsOsaMinor.push(
    new THREE.Vector3(
      alifaAlFarkadain.x,
      alifaAlFarkadain.y,
      alifaAlFarkadain.z
    )
  );
  pointsOsaMinor.push(
    new THREE.Vector3(
      anwarAlFarkadain.x,
      anwarAlFarkadain.y,
      anwarAlFarkadain.z
    )
  );
  pointsOsaMinor.push(new THREE.Vector3(pherkad.x, pherkad.y, pherkad.z));
  pointsOsaMinor.push(new THREE.Vector3(kochab.x, kochab.y, kochab.z));
  pointsOsaMinor.push(
    new THREE.Vector3(
      alifaAlFarkadain.x,
      alifaAlFarkadain.y,
      alifaAlFarkadain.z
    )
  );

  const geometryOsaMinor = new THREE.BufferGeometry().setFromPoints(
    pointsOsaMinor
  );

  const lineOsaMinor = new THREE.Line(geometryOsaMinor, material);
  return lineOsaMinor;
};
