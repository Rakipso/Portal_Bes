export interface LogEntry {
  id: string;
  type: 'INFO' | 'WARN' | 'ERROR';
  message: string;
  timestamp: string;
}

const LOGS_KEY = 'portal_bes_logs';
const MAINTENANCE_KEY = 'portal_bes_maintenance';

// Simulador de latencia de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MockAPI = {
  /**
   * Obtiene el estado actual de mantenimiento desde localStorage
   */
  async getMaintenanceStatus(): Promise<boolean> {
    await delay(500); // Simulando latencia
    if (typeof window !== 'undefined') {
      return localStorage.getItem(MAINTENANCE_KEY) === 'true';
    }
    return false;
  },

  /**
   * Cambia el estado de mantenimiento
   */
  async toggleMaintenance(status: boolean, adminName?: string): Promise<boolean> {
    await delay(500); // Simulando latencia
    if (typeof window !== 'undefined') {
      localStorage.setItem(MAINTENANCE_KEY, status.toString());
      
      const logMessage = status 
        ? `Modo de mantenimiento ACTIVADO por ${adminName || 'Admin'}`
        : `Modo de mantenimiento DESACTIVADO por ${adminName || 'Admin'}`;
        
      this.addLog(status ? 'WARN' : 'INFO', logMessage);
      
      // Emitir evento para pestañas/componentes sincronizados
      window.dispatchEvent(new Event('maintenance_changed'));
    }
    return status;
  },

  /**
   * Obtiene los últimos logs
   */
  async getLogs(): Promise<LogEntry[]> {
    await delay(500); // Simulando latencia
    if (typeof window !== 'undefined') {
      const logsStr = localStorage.getItem(LOGS_KEY);
      if (logsStr) {
        return JSON.parse(logsStr);
      }
      
      // Si está vacío, poblar con logs de ejemplo para la presentación
      const defaultLogs: LogEntry[] = [
        { id: '1', type: 'ERROR', message: 'Connection timeout at /api/benefits - Retrying...', timestamp: new Date(Date.now() - 3600000).toISOString() },
        { id: '2', type: 'WARN', message: 'High memory usage detected on worker #4', timestamp: new Date(Date.now() - 7200000).toISOString() },
        { id: '3', type: 'INFO', message: 'Daily backup completed successfully', timestamp: new Date(Date.now() - 86400000).toISOString() }
      ];
      localStorage.setItem(LOGS_KEY, JSON.stringify(defaultLogs));
      return defaultLogs;
    }
    return [];
  },

  /**
   * Agrega un log (Uso interno o de componentes)
   */
  async addLog(type: 'INFO' | 'WARN' | 'ERROR', message: string): Promise<void> {
    if (typeof window !== 'undefined') {
      const newLog: LogEntry = {
        id: Math.random().toString(36).substring(2, 9),
        type,
        message,
        timestamp: new Date().toISOString()
      };
      
      const logsStr = localStorage.getItem(LOGS_KEY);
      let logs: LogEntry[] = logsStr ? JSON.parse(logsStr) : [];
      
      // Agregar al principio y mantener solo 50
      logs = [newLog, ...logs].slice(0, 50);
      localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
    }
  }
};
