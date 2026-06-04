"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface MaintenanceContextType {
  isMaintenanceMode: boolean;
  setMaintenanceMode: (status: boolean, adminName?: string) => Promise<void>;
  isLoading: boolean;
}

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined);

export function MaintenanceProvider({ children }: { children: React.ReactNode }) {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar estado inicial desde el backend
  useEffect(() => {
    const fetchMaintenanceStatus = async () => {
      try {
        const response = await fetch('/api/maintenance');
        const data = await response.json();
        if (data.success) {
          setIsMaintenanceMode(data.isMaintenance);
        }
      } catch (error) {
        console.error("Error al obtener estado de mantenimiento", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMaintenanceStatus();
    
    // Polling cada 30 segundos para revisar si alguien más activó el mantenimiento
    const interval = setInterval(fetchMaintenanceStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const setMaintenanceMode = async (status: boolean, adminName?: string) => {
    // Actualización optimista
    setIsMaintenanceMode(status);
    
    try {
      const response = await fetch('/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isMaintenance: status, adminName })
      });
      const data = await response.json();
      if (!data.success) {
        // Revertir en caso de error
        setIsMaintenanceMode(!status);
      }
    } catch (error) {
      console.error("Fallo de red al intentar cambiar el mantenimiento", error);
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
