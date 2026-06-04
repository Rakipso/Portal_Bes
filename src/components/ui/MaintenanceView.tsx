"use client";

import React from 'react';
import { useMaintenance } from '@/hooks/useMaintenance';
import { useAuth } from '@/hooks/useAuth';

export function MaintenanceWrapper({ children }: { children: React.ReactNode }) {
  const { isMaintenanceMode } = useMaintenance();
  const { user } = useAuth();

  if (isMaintenanceMode && user?.role !== 'ADMIN') {
    return (
      <section id="maintenance-view" className="view active" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '20px' }}>
        <div style={{ maxWidth: '600px', padding: '40px', background: 'rgba(255,255,255,0.9)', borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '20px' }}>
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
          </svg>
          <h1 style={{ color: 'var(--primary)', marginBottom: '16px', fontSize: '28px' }}>Plataforma en Actualización</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.5' }}>
            El Portal de Beneficios Estatales se encuentra en un proceso de actualización programada para mejorar la infraestructura y la seguridad de sus datos.
          </p>
          <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(217, 119, 6, 0.1)', borderRadius: '8px', color: '#d97706', fontWeight: 500 }}>
            El servicio se restablecerá próximamente.
          </div>
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
