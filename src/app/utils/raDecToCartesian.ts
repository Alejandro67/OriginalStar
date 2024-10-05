export function raDecToCartesian(ra: number, dec: number, distance: number) {
  const raRad = ra * (Math.PI / 180);
  const decRad = dec * (Math.PI / 180);

  const x = distance * Math.cos(decRad) * Math.cos(raRad);
  const y = distance * Math.cos(decRad) * Math.sin(raRad);
  const z = distance * Math.sin(decRad);
  return { x, y, z };
}
