import { addLog } from './db';

/**
 * Logger del lado del servidor.
 * Registra eventos en Vercel KV y también imprime en la consola local.
 */
export const logger = {
  info: async (message: string) => {
    console.log(`[INFO] ${message}`);
    await addLog('INFO', message);
  },
  warn: async (message: string) => {
    console.warn(`[WARN] ${message}`);
    await addLog('WARN', message);
  },
  error: async (message: string) => {
    console.error(`[ERROR] ${message}`);
    await addLog('ERROR', message);
  }
};
