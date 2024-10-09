// Constantes
const L_sun = 3.828 * Math.pow(10, 26); // Luminosidad del Sol en W
const M_sun = 4.67; // Magnitud absoluta del Sol en la banda G
const sigma = 5.67 * Math.pow(10, -8); // Constante de Stefan-Boltzmann en W·m^-2·K^-4
const pi = Math.PI;

// Función para calcular el radio de una estrella
export function calculeStarRadius(
  magAparente: number,
  distanciaParsecs: number,
  teff: number
) {
  const ESCALA = 0.00000000001; // Factor de escala personalizado para reducir el tamaño

  // Paso 1: Calcular magnitud absoluta
  const magnitudAbsoluta = magAparente - 5 * Math.log10(distanciaParsecs) + 5;

  // Paso 2: Calcular luminosidad en relación al Sol
  const luminosidad = L_sun * Math.pow(10, 0.4 * (M_sun - magnitudAbsoluta));

  // Paso 3: Calcular el radio de la estrella
  const radio = Math.sqrt(luminosidad / (4 * pi * sigma * Math.pow(teff, 4)));

  const radioEscalado = radio * ESCALA;

  const TAMANO_MINIMO = 0.5;

  return Math.max(radioEscalado, TAMANO_MINIMO);
}
