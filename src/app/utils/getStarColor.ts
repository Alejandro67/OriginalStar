type Color = {
  r: number;
  g: number;
  b: number;
};

export const COLOR_SCALE = [
  { minTemp: 2500, maxTemp: 3000, color: { r: 139, g: 0, b: 0 } }, // Rojo oscuro
  { minTemp: 3000, maxTemp: 4000, color: { r: 255, g: 0, b: 0 } }, // Rojo
  { minTemp: 4000, maxTemp: 5000, color: { r: 255, g: 165, b: 0 } }, // Naranja
  { minTemp: 5000, maxTemp: 6000, color: { r: 255, g: 255, b: 0 } }, // Amarillo
  { minTemp: 6000, maxTemp: 7000, color: { r: 255, g: 255, b: 224 } }, // Amarillo-blanco
  { minTemp: 7000, maxTemp: 8000, color: { r: 255, g: 255, b: 255 } }, // Blanco
  { minTemp: 8000, maxTemp: 9000, color: { r: 173, g: 216, b: 230 } }, // Azul-blanco
  { minTemp: 9000, maxTemp: 10000, color: { r: 0, g: 0, b: 255 } }, // Azul
  { minTemp: 10000, maxTemp: 12000, color: { r: 100, g: 149, b: 237 } }, // Azul claro
  { minTemp: 12000, maxTemp: 15000, color: { r: 0, g: 0, b: 139 } }, // Azul intenso
];

export function getStarColor(teff: number) {
  // Encuentra el color correspondiente a la temperatura
  for (const range of COLOR_SCALE) {
    if (teff >= range.minTemp && teff < range.maxTemp) {
      return [range.color.r, range.color.g, range.color.b];
    }
  }
  const color = COLOR_SCALE[COLOR_SCALE.length - 1].color;

  return [color.r, color.g, color.b]; // Si es más alto que el máximo
}
