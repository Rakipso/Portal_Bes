"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ClaveUnicaBtn } from '@/components/ui/ClaveUnicaBtn';
import { IUser } from '@/lib/types';

export default function LoginPage() {
  const { user, login, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/ciudadano');
      }
    }
  }, [user, isLoading, router]);

  const handleMockLogin = () => {
    const mockUser: IUser = {
      name: "María Fernanda Sandoval",
      gender: "F",
      income: 40,
      isStudent: true,
      age: 22,
      hasContract: false,
      monthsWorked: 0,
      isReal: false,
      role: "USER"
    };
    login(mockUser);
  };

  if (isLoading) return null; // Or a loading spinner

  return (
    <section id="login-view" className="view active" aria-labelledby="login-title" style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="login-container">
        <div className="login-header">
          <img src="https://flagcdn.com/w80/cl.png" alt="Bandera de Chile" className="flag-icon" />
          <h1 id="login-title">Beneficios Estatales</h1>
          <p>Ingresa para conocer los beneficios a los que puedes optar</p>
        </div>
        
        <ClaveUnicaBtn onClick={handleMockLogin} />
      </div>
    </section>
  );
}
