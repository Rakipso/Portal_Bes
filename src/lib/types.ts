// Tipos base para el usuario validado en el sistema
export interface IUser {
  name: string;
  gender: "M" | "F" | "Real";
  income: number; // Porcentaje de vulnerabilidad en RSH (ej. 40, 60, 90)
  isStudent: boolean;
  age: number;
  hasContract: boolean;
  monthsWorked: number;
  isReal: boolean;
  role: "USER" | "ADMIN";
}

// Requisitos dinámicos que puede exigir cada beneficio
export interface IBenefitRequirements {
  minAge?: number;
  maxAge?: number;
  maxIncome?: number;
  gender?: "M" | "F";
  isStudent?: boolean;
  hasContract?: boolean;
  minMonthsWorked?: number;
}

// Estructura de respuestas (tanto para éxitos como para rechazos)
export type RecordResponses = Partial<Record<keyof IBenefitRequirements, string>>;

// Interfaz principal del Dominio: Beneficio
export interface IBenefit {
  id: number;
  institution: string;
  title: string;
  description: string;
  tag: string;
  url: string;
  reqs: IBenefitRequirements;
  reasons: RecordResponses;
  successes: RecordResponses;
  manualReqs?: string[];
  linkStatus?: 'active' | 'down';
}
