"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useBenefits } from '@/hooks/useBenefits';
import { BenefitCard } from '@/components/benefits/BenefitCard';

export default function CiudadanoDashboard() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated or not a USER
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      }
    }
  }, [user, isLoading, router]);

  const { eligible, pending, ineligible } = useBenefits(user);

  if (isLoading || !user) return null;

  return (
    <section id="dashboard-view" className="view active" aria-live="polite">
      <nav className="navbar">
        <div className="nav-brand">
          <img src="https://flagcdn.com/w40/cl.png" alt="Chile" />
          <span>Mis Beneficios</span>
        </div>
        <div className="nav-user">
          <span id="user-name-display" style={{ fontWeight: 700, color: '#0F4C81' }}>{user.name}</span>
          {/* Display masked RUT - in a real app this would come from the auth token */}
          <span id="user-rut-display" style={{ color: 'var(--text-secondary)' }}>12.345.***-*</span>
          
          {user.role === 'ADMIN' && (
            <button 
              onClick={() => router.push('/admin')}
              style={{
                marginLeft: '10px',
                padding: '6px 12px',
                background: '#0F4C81',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Ir al Panel de Auditoría
            </button>
          )}

          <button id="logout-btn" className="btn-logout" onClick={logout}>Cerrar Sesión</button>
        </div>
      </nav>

      <main className="dashboard-content">
        <header className="dashboard-header">
          <h2 id="dashboard-greeting" tabIndex={-1}>
            {user.gender === 'F' ? 'Bienvenida' : 'Bienvenido'} {user.name}, estos son los beneficios a los que puedes acceder
          </h2>
          <p>Haz clic en cualquier de ellos para ir al portal oficial e iniciar tu postulación.</p>
        </header>

        <div className="benefits-grid">
          {eligible.map((item) => (
            <BenefitCard 
              key={item.benefit.id} 
              benefit={item.benefit} 
              status="eligible" 
              successes={item.successes} 
              isOffline={item.isOffline}
            />
          ))}
        </div>

        {pending.length > 0 && (
          <>
            <div className="divider" style={{ marginTop: '60px', marginBottom: '40px' }}>
              <span style={{ background: 'var(--bg-color)', fontSize: '16px', fontWeight: 600, color: '#d97706' }}>
                Requiere Acreditación Adicional
              </span>
            </div>

            <header className="dashboard-header" style={{ marginBottom: '24px' }}>
              <h3 style={{ color: '#d97706', fontSize: '20px' }}>Beneficios sujetos a acreditación de antecedentes</h3>
              <p style={{ fontSize: '14px', maxWidth: '800px' }}>
                Cumples con el perfil socioeconómico y de edad básicos, pero el sistema requiere documentación adicional (certificados médicos, actas, comprobantes, etc.) para validar tu postulación.
              </p>
            </header>

            <div className="benefits-grid pending-grid">
              {pending.map((item) => (
                <BenefitCard 
                  key={item.benefit.id} 
                  benefit={item.benefit} 
                  status="pending" 
                  successes={item.successes}
                  isOffline={item.isOffline}
                />
              ))}
            </div>
          </>
        )}

        {ineligible.length > 0 && (
          <>
            <div className="divider" style={{ marginTop: '60px', marginBottom: '40px' }}>
              <span style={{ background: 'var(--bg-color)', fontSize: '16px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Beneficios No Aplicables
              </span>
            </div>

            <header className="dashboard-header" style={{ marginBottom: '24px' }}>
              <h3 style={{ color: 'var(--text-secondary)', fontSize: '20px' }}>No cumples los requisitos para estos beneficios</h3>
              <p style={{ fontSize: '14px' }}>Revisa los motivos listados en cada tarjeta.</p>
            </header>

            <div className="benefits-grid ineligible-grid">
              {ineligible.map((item) => (
                <BenefitCard 
                  key={item.benefit.id} 
                  benefit={item.benefit} 
                  status="ineligible" 
                  failures={item.failures}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </section>
  );
}
