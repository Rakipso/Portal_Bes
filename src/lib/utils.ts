/**
 * Formatea un RUT chileno agregando puntos y guión.
 * Ejemplo: "123456789" -> "12.345.678-9"
 */
export function formatRUT(rut: string): string {
  let value = rut.replace(/[^0-9kK]+/g, '').toUpperCase();
  if (value.length > 1) {
      let body = value.slice(0, -1);
      const dv = value.slice(-1);
      body = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      value = `${body}-${dv}`;
  }
  return value;
}

/**
 * Valida un RUT chileno usando el algoritmo de módulo 11.
 * Retorna true si es válido, false en caso contrario.
 */
export function validateRUT(rutCompleto: string): boolean {
  if (!/^[0-9]+-[0-9kK]{1}$/.test(rutCompleto)) return false;
  
  const parts = rutCompleto.split('-');
  if (parts.length !== 2) return false;
  
  let rut = parseInt(parts[0], 10);
  const digv = parts[1];
  
  let m = 0;
  let s = 1;
  for (; rut; rut = Math.floor(rut / 10)) {
      s = (s + (rut % 10) * (9 - (m++ % 6))) % 11;
  }
  
  const dvEsperado = s ? s - 1 : 'K';
  return dvEsperado.toString() === digv.toUpperCase();
}
