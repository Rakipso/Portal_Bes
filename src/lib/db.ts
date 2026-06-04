import { kv } from '@vercel/kv';

export interface LogEntry {
  id: string;
  type: 'INFO' | 'WARN' | 'ERROR';
  message: string;
  timestamp: string;
}

const LOGS_KEY = 'portal_bes_logs';
const MAINTENANCE_KEY = 'portal_bes_maintenance';

/**
 * Agrega un nuevo log a Vercel KV.
 * Mantiene un máximo de 50 logs para no exceder el almacenamiento.
 */
export async function addLog(type: 'INFO' | 'WARN' | 'ERROR', message: string) {
  try {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      message,
      timestamp: new Date().toISOString()
    };
    
    // Obtenemos logs actuales
    let currentLogs: LogEntry[] = await kv.get(LOGS_KEY) || [];
    
    // Insertamos al principio y mantenemos solo los últimos 50
    currentLogs = [newLog, ...currentLogs].slice(0, 50);
    
    // Guardamos de vuelta
    await kv.set(LOGS_KEY, currentLogs);
    return newLog;
  } catch (error) {
    console.error("No se pudo guardar el log en KV", error);
  }
}

/**
 * Obtiene los logs de la base de datos
 */
export async function getLogs(): Promise<LogEntry[]> {
  try {
    return await kv.get(LOGS_KEY) || [];
  } catch (error) {
    console.error("Error al obtener logs", error);
    return [];
  }
}

/**
 * Establece el estado global de mantenimiento
 */
export async function setMaintenanceState(isMaintenance: boolean) {
  try {
    await kv.set(MAINTENANCE_KEY, isMaintenance);
    return isMaintenance;
  } catch (error) {
    console.error("Error al guardar estado de mantenimiento", error);
  }
}

/**
 * Obtiene el estado global de mantenimiento
 */
export async function getMaintenanceState(): Promise<boolean> {
  try {
    const state = await kv.get<boolean>(MAINTENANCE_KEY);
    return state === true;
  } catch (error) {
    console.error("Error al obtener estado de mantenimiento", error);
    return false;
  }
}
