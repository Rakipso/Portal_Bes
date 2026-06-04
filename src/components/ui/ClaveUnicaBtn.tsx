import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Aquí podríamos agregar props específicos si se requieren en el futuro
}

export function ClaveUnicaBtn({ className, ...props }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0' }}>
      <button 
        type="button" 
        className={`btn clave-unica-btn ${className || ''}`} 
        style={{ width: '100%' }}
        {...props}
      >
        <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Logo Shapes C and U interlocking */}
          <path d="M 24 10 A 10 10 0 1 0 24 30" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
          <path d="M 16 10 A 10 10 0 1 1 16 30" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
        </svg>
        <span>Ingresar con ClaveÚnica</span>
      </button>
      <p className="cu-note" style={{ marginTop: '16px', textAlign: 'center' }}>
        Al hacer clic iniciarás con el sistema (simulado)
      </p>
    </div>
  );
}
