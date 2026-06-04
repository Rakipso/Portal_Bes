"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MockAPI } from '@/services/api';

interface MaintenanceContextType {
  isMaintenanceMode: boolean;
  setMaintenanceMode: (status: boolean, adminName?: string) => Promise<void>;
  isLoading: boolean;
}

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined);

export function MaintenanceProvider({ children }: { children: React.ReactNode }) {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMaintenanceStatus = async () => {
    try {
      const status = await MockAPI.getMaintenanceStatus();
      setIsMaintenanceMode(status);
    } catch (error) {
      console.error("Error al obtener estado de mantenimiento", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar estado inicial desde el Mock Service
  useEffect(() => {
    fetchMaintenanceStatus();
    
    // Escuchar el evento personalizado emitido por MockAPI para sincronizar al instante
    const handleMaintenanceChange = () => fetchMaintenanceStatus();
    window.addEventListener('maintenance_changed', handleMaintenanceChange);
    
    // Polling cada 10 segundos por seguridad (para multi-ventanas)
    const interval = setInterval(fetchMaintenanceStatus, 10000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('maintenance_changed', handleMaintenanceChange);
    };
  }, []);

  const setMaintenanceMode = async (status: boolean, adminName?: string) => {
    // Actualización optimista
    setIsMaintenanceMode(status);
    
    try {
      await MockAPI.toggleMaintenance(status, adminName);
    } catch (error) {
      console.error("Fallo simulado al intentar cambiar el mantenimiento", error);
      setIsMaintenanceMode(!status); // Revertir
    }
  };

  return (
    <MaintenanceContext.Provider value={{ isMaintenanceMode, setMaintenanceMode, isLoading }}>
      {children}
    </MaintenanceContext.Provider>
  );
}

export function useMaintenance() {
  const context = useContext(MaintenanceContext);
  if (context === undefined) {
    throw new Error('useMaintenance must be used within a MaintenanceProvider');
  }
  return context;
}
