"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ClaveUnicaBtn } from '@/components/ui/ClaveUnicaBtn';
import { formatRUT, validateRUT, fetchRealNameFromRUT } from '@/lib/utils';

export default function LoginPage() {
  const { user, login, isLoading } = useAuth();
  const router = useRouter();

  const [showCUForm, setShowCUForm] = useState(false);
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/ciudadano');
    }
  }, [user, isLoading, router]);

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRUT(e.target.value);
    setRut(formatted);
    setError('');
  };

  const handleMockLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRUT(rut)) {
      setError('RUT inválido. Verifica el formato e inténtalo de nuevo.');
      return;
    }
    
    setIsAuthenticating(true);
    try {
      const mockUser = await fetchRealNameFromRUT(rut);
      login(mockUser);
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al iniciar sesión.');
      setIsAuthenticating(false);
    }
  };

  if (isLoading) return null;

  return (
    <section id="login-view" className="view active" aria-labelledby="login-title" style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', padding: '20px', background: showCUForm ? '#e2e8f0' : 'transparent' }}>
      
      {!showCUForm ? (
        <div className="login-container">
          <div className="login-header">
            <img src="https://flagcdn.com/w80/cl.png" alt="Bandera de Chile" className="flag-icon" />
            <h1 id="login-title">Beneficios Estatales</h1>
            <p>Ingresa para conocer los beneficios a los que puedes optar</p>
          </div>
          
          <ClaveUnicaBtn onClick={() => setShowCUForm(true)} />
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: '440px', background: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
          <div style={{ background: '#0f1624', padding: '24px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 24 10 A 10 10 0 1 0 24 30" stroke="#fff" strokeWidth="4.5" strokeLinecap="round"/>
              <path d="M 16 10 A 10 10 0 1 1 16 30" stroke="#fff" strokeWidth="4.5" strokeLinecap="round"/>
            </svg>
            <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>ClaveÚnica</span>
          </div>
          <div style={{ padding: '32px' }}>
            <h2 style={{ marginBottom: '24px', fontSize: '18px', color: 'var(--text-primary)', textAlign: 'center' }}>Iniciar sesión</h2>
            <form onSubmit={handleMockLogin}>
              <div className="input-group" style={{ marginBottom: '16px' }}>
                <label htmlFor="cu-rut" style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>RUN</label>
                <input 
                  type="text" 
                  id="cu-rut" 
                  placeholder="11.222.333-4" 
                  required 
                  autoComplete="off" 
                  style={{ borderRadius: '4px', padding: '10px', width: '100%', border: '1px solid #ccc' }} 
                  aria-describedby="cu-rut-help"
                  value={rut}
                  onChange={handleRutChange}
                />
                <small id="cu-rut-help" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px' }}>Incluye puntos y guion.</small>
              </div>
              <div className="input-group" style={{ marginBottom: '32px' }}>
                <label htmlFor="cu-pass" style={{ fontWeight: 600, display: 'block', marginBottom: '8px' }}>ClaveÚnica</label>
                <input 
                  type="password" 
                  id="cu-pass" 
                  placeholder="Escribe tu ClaveÚnica" 
                  required 
                  style={{ borderRadius: '4px', padding: '10px', width: '100%', border: '1px solid #ccc' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <div style={{ color: '#dc2626', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                className="btn" 
                style={{ backgroundColor: '#0d6efd', color: 'white', borderRadius: '4px', fontWeight: 400, fontSize: '18px', width: '100%', padding: '10px', border: 'none', cursor: 'pointer', opacity: isAuthenticating ? 0.7 : 1 }}
                disabled={isAuthenticating}
              >
                {isAuthenticating ? 'Autenticando...' : 'Autenticar'}
              </button>
              <button 
                type="button" 
                className="btn" 
                onClick={() => setShowCUForm(false)}
                style={{ background: 'transparent', color: '#0d6efd', marginTop: '12px', borderRadius: '4px', fontWeight: 400, width: '100%', padding: '10px', border: 'none', cursor: 'pointer' }}
              >
                Volver al trámite
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
