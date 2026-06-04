"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface MaintenanceContextType {
  isMaintenanceMode: boolean;
  setMaintenanceMode: (status: boolean) => void;
}

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined);

export function MaintenanceProvider({ children }: { children: React.ReactNode }) {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedStatus = localStorage.getItem('portal_bes_maintenance');
    if (savedStatus === 'true') {
      setIsMaintenanceMode(true);
    }
  }, []);

  const setMaintenanceMode = (status: boolean) => {
    setIsMaintenanceMode(status);
    localStorage.setItem('portal_bes_maintenance', status.toString());
  };

  return (
    <MaintenanceContext.Provider value={{ isMaintenanceMode, setMaintenanceMode }}>
      {/* 
        Renderizamos children normalmente. 
        El layout principal decidirá si mostrar la vista de mantenimiento o no basado en este estado.
      */}
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
