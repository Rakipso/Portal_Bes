"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useMaintenance } from '@/hooks/useMaintenance';

export default function AdminDashboard() {
  const { user, logout, isLoading } = useAuth();
  const { isMaintenanceMode, setMaintenanceMode } = useMaintenance();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      } else if (user.role !== 'ADMIN') {
        router.push('/ciudadano');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  return (
    <section id="dashboard-view" className="view active" aria-live="polite">
      <nav className="navbar">
        <div className="nav-brand">
          <img src="https://flagcdn.com/w40/cl.png" alt="Chile" />
          <span>Panel de Administración</span>
        </div>
        <div className="nav-user">
          <span id="user-name-display" style={{ fontWeight: 700, color: '#0F4C81' }}>{user.name}</span>
          <button id="logout-btn" className="btn-logout" onClick={logout}>Cerrar Sesión</button>
        </div>
      </nav>

      <main className="dashboard-content">
        <header className="dashboard-header">
          <h2>Panel de Control y Mantenimiento</h2>
          <p>Desde aquí podrás gestionar los logs de la API y programar ventanas de actualización.</p>
        </header>

        <div style={{ marginTop: '40px', padding: '40px', background: 'var(--card-glass)', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--primary)' }}>Control de Accesos</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: 'rgba(255,255,255,0.5)', borderRadius: '8px' }}>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Modo Mantenimiento Global</p>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Al activar, los ciudadanos verán una pantalla de mantenimiento y no podrán acceder a sus beneficios.</p>
            </div>
            <button 
              onClick={() => setMaintenanceMode(!isMaintenanceMode)}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: isMaintenanceMode ? '#dc2626' : '#16a34a',
                color: 'white',
                transition: 'background 0.2s'
              }}
            >
              {isMaintenanceMode ? 'Desactivar Mantenimiento' : 'Activar Mantenimiento'}
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}
