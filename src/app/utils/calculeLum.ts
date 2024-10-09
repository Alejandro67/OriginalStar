export function calculeLum(magAparente: number, distanciaParsecs: number) {
  const magnitudAbsoluta = magAparente - 5 * Math.log10(distanciaParsecs) + 5;

  // Luminosidad relativa (escalar para que sea manejable)
  const L_sun = 3.828 * Math.pow(10, 26); // Luminosidad del Sol en W
  const L_relativa = Math.pow(10, -0.4 * magnitudAbsoluta); // Escalar la luminosidad

  // Escalar la luminosidad para que sea adecuada en el entorno 3D
  const factorEscala = 10;
  return L_relativa * factorEscala;
}
