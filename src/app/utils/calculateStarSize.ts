// Constante de Stefan-Boltzmann
const stefanBoltzmannConstant = 5.67e-8; // en W/m^2K^4
const solarLuminosity = 3.828e26; // Luminosidad solar en vatios
const solarAbsoluteMagnitude = 4.83; // Magnitud absoluta del Sol

// Función para calcular la magnitud absoluta
function calculateAbsoluteMagnitude(
  apparentMagnitude: number,
  distanceParsecs: number
) {
  return apparentMagnitude - 5 * Math.log10(distanceParsecs) + 5;
}

// Función para calcular la luminosidad de la estrella en vatios
function calculateLuminosity(absoluteMagnitude: number) {
  return (
    solarLuminosity *
    Math.pow(10, (solarAbsoluteMagnitude - absoluteMagnitude) / 2.5)
  );
}

// Función para calcular el radio de la estrella en metros
function calculateStarRadius(luminosity: number, temperature: number) {
  return Math.sqrt(
    luminosity /
      (4 * Math.PI * stefanBoltzmannConstant * Math.pow(temperature, 4))
  );
}

// Función principal que recibe los datos
export function calculateStarSize(
  teff_gspphot: number,
  phot_g_mean_mag: number,
  distance_gspphot: number
) {
  // Paso 1: Calcular la magnitud absoluta
  const absoluteMagnitude = calculateAbsoluteMagnitude(
    phot_g_mean_mag,
    distance_gspphot
  );

  // Paso 2: Calcular la luminosidad en vatios
  const luminosity = calculateLuminosity(absoluteMagnitude);

  // Paso 3: Calcular el radio en metros
  const radius = calculateStarRadius(luminosity, teff_gspphot);

  // Convertimos el radio a unidades solares dividiendo entre el radio solar (6.96e8 metros)
  const radiusInSolarUnits = radius / 6.96e8;

  return radiusInSolarUnits; // Devolvemos el radio en unidades solares
}
