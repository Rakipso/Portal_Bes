"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useMaintenance } from '@/hooks/useMaintenance';
import { MockAPI } from '@/services/api';
import { BenefitsManager } from '@/components/admin/BenefitsManager';

export default function AdminDashboard() {
  const { user, logout, isLoading: authLoading } = useAuth();
  const { isMaintenanceMode, setMaintenanceMode, isLoading: maintLoading } = useMaintenance();
  const router = useRouter();
  
  const [logs, setLogs] = useState<any[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);

  // Redirección de seguridad
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
      } else if (user.role !== 'ADMIN') {
        router.push('/ciudadano');
      }
    }
  }, [user, authLoading, router]);

  // Cargar Logs periódicamente
  useEffect(() => {
    if (!user || user.role !== 'ADMIN') return;

    const fetchLogs = async () => {
      try {
        const data = await MockAPI.getLogs();
        setLogs(data);
      } catch (error) {
        console.error("Error al obtener logs", error);
      } finally {
        setLoadingLogs(false);
      }
    };

    fetchLogs();
    
    // Escuchar el evento personalizado emitido por MockAPI
    const handleMaintenanceChange = () => fetchLogs();
    window.addEventListener('maintenance_changed', handleMaintenanceChange);
    
    const interval = setInterval(fetchLogs, 10000); // Polling cada 10 segs
    return () => {
      clearInterval(interval);
      window.removeEventListener('maintenance_changed', handleMaintenanceChange);
    };
  }, [user]);

  if (authLoading || !user) return null;

  return (
    <section id="dashboard-view" className="view active" aria-live="polite">
      <nav className="navbar">
        <div className="nav-brand">
          <img src="https://flagcdn.com/w40/cl.png" alt="Chile" />
          <span>Panel de Administración</span>
        </div>
        <div className="nav-user">
          <span id="user-name-display" style={{ fontWeight: 700, color: '#0F4C81' }}>{user.name}</span>
          
          <button 
            onClick={() => router.push('/ciudadano')}
            style={{
              marginLeft: '10px',
              padding: '6px 12px',
              background: '#e2e8f0',
              color: '#0F4C81',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Ver Mis Beneficios
          </button>

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
              onClick={() => setMaintenanceMode(!isMaintenanceMode, user.name)}
              disabled={maintLoading}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: 600,
                border: 'none',
                cursor: maintLoading ? 'wait' : 'pointer',
                background: isMaintenanceMode ? '#dc2626' : '#16a34a',
                color: 'white',
                transition: 'background 0.2s',
                opacity: maintLoading ? 0.7 : 1
              }}
            >
              {maintLoading ? 'Cambiando...' : (isMaintenanceMode ? 'Desactivar Mantenimiento' : 'Activar Mantenimiento')}
            </button>
          </div>
        </div>

        <div style={{ marginTop: '40px', padding: '40px', background: 'var(--card-glass)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ color: 'var(--primary)', margin: 0 }}>Registros de Errores (Logs en vivo)</h3>
            {loadingLogs && <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Actualizando...</span>}
          </div>
          <div style={{ background: '#1e293b', borderRadius: '8px', padding: '20px', overflowX: 'auto', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6', maxHeight: '300px', overflowY: 'auto' }}>
            
            {logs.length === 0 && !loadingLogs && (
              <div style={{ color: '#94a3b8', fontStyle: 'italic' }}>No hay registros disponibles en la base de datos.</div>
            )}
            
            {logs.map((log) => {
              let color = '#e2e8f0';
              if (log.type === 'ERROR') color = '#ef4444';
              if (log.type === 'WARN') color = '#eab308';
              if (log.type === 'INFO') color = '#22c55e';
              
              const dateObj = new Date(log.timestamp);
              const formattedDate = dateObj.toLocaleString('es-CL');

              return (
                <div key={log.id} style={{ color, marginBottom: '4px' }}>
                  [{log.type}] [{formattedDate}] {log.message}
                </div>
              );
            })}
          </div>
        </div>

        {/* Nuevo componente de gestión de beneficios dinámicos */}
        <BenefitsManager />
      </main>
    </section>
  );
}
