import { IUser } from "./types";

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
  // Remover puntos para la validación
  const cleanRut = rutCompleto.replace(/\./g, '');
  
  if (!/^[0-9]+-[0-9kK]{1}$/.test(cleanRut)) return false;
  
  const parts = cleanRut.split('-');
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

/**
 * Genera información de usuario mockeada de forma determinista usando el RUT.
 */
export function getUserMockInfo(rut: string): IUser {
  if (rut.includes("Clave Única")) return { name: "Usuario Clave Única", gender: "M", income: 50, isStudent: false, age: 30, hasContract: true, monthsWorked: 10, isReal: false, role: "USER" };
  
  const digits = rut.replace(/[^0-9Kk]/g, '').toUpperCase();
  
  // Hardcoded entry for specific user (Admin)
  if (digits === "221275896") {
      return {
          name: "Tomas Morales Solis",
          gender: "M",
          income: 30, // 30% vulnerable
          isStudent: true,
          age: 20,
          hasContract: true,
          monthsWorked: 5,
          isReal: false,
          role: "ADMIN"
      };
  }

  // Hardcoded entry for specific user (User)
  if (digits === "165282307") {
      return {
          name: "Alex Gonzalez",
          gender: "M",
          income: 50, 
          isStudent: false, 
          age: 35, 
          hasContract: true, 
          monthsWorked: 24, 
          isReal: false,
          role: "USER"
      };
  }

  const soloNumeros = digits.replace(/[^0-9]/g, '');
  if (!soloNumeros) return { name: "Usuario", gender: "M", income: 50, isStudent: false, age: 30, hasContract: false, monthsWorked: 0, isReal: false, role: "USER" };

  const mathSum = soloNumeros.split('').reduce((a, b) => a + parseInt(b, 10), 0);
  
  // Gender
  const firstDigit = parseInt(soloNumeros[0], 10);
  const isFemale = firstDigit % 2 === 0;

  // Student Status
  const isStudent = soloNumeros.length > 1 ? parseInt(soloNumeros[1], 10) > 4 : false;

  // Income Percentile
  const income = (mathSum % 9 + 1) * 10; 

  // Age
  let age = 18 + (mathSum % 58);
  if (parseInt(soloNumeros.substring(0, 2), 10) <= 8 && soloNumeros.length >= 8) {
      age = 65 + (mathSum % 15);
  }
  
  // Labor
  const hasContract = (mathSum % 2 !== 0);
  const monthsWorked = mathSum % 24;

  return {
      name: isFemale ? "María Fernanda Sandoval" : "Juan Carlos Pérez",
      gender: isFemale ? "F" : "M",
      income: income,
      isStudent: isStudent,
      age: age,
      hasContract: hasContract,
      monthsWorked: monthsWorked,
      isReal: false,
      role: "USER"
  };
}

/**
 * Intenta obtener el nombre real de una API abierta y lo mezcla con el mock.
 */
export async function fetchRealNameFromRUT(rutCompleto: string): Promise<IUser> {
  const cleanRut = rutCompleto.replace(/\./g, '');
  const mockProfile = getUserMockInfo(rutCompleto);
  
  try {
      const response = await fetch(`https://api.libreapi.cl/rut/activities?rut=${cleanRut}`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      const foundName = data?.data?.name || data?.nombre;
      
      if (foundName) {
          return { ...mockProfile, name: foundName, gender: "Real", isReal: true };
      }
      return mockProfile;
  } catch (error) {
      console.error("No se pudo obtener datos reales de la API. Usando mock determinista.");
      return mockProfile;
  }
}
