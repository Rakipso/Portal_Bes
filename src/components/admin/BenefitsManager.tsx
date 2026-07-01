import { useState, useEffect } from 'react';
import { IBenefit } from '@/lib/types';

export function BenefitsManager() {
  const [benefits, setBenefits] = useState<IBenefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    try {
      const res = await fetch('/api/benefits');
      const data = await res.json();
      setBenefits(data);
    } catch (error) {
      console.error('Error fetching benefits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: number, url: string, linkStatus: 'up' | 'down') => {
    setSavingId(id);
    try {
      const res = await fetch('/api/benefits', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, url, linkStatus })
      });
      
      if (res.ok) {
        // Actualizar el estado local
        setBenefits(prev => prev.map(b => 
          b.id === id ? { ...b, url, linkStatus } : b
        ));
      } else {
        alert('Error al actualizar el beneficio');
      }
    } catch (error) {
      console.error('Error updating benefit:', error);
      alert('Error de red al actualizar');
    } finally {
      setSavingId(null);
    }
  };

  if (loading) return <div style={{ padding: '20px', color: 'var(--text-secondary)' }}>Cargando beneficios...</div>;

  return (
    <div style={{ marginTop: '40px', padding: '40px', background: 'var(--card-glass)', borderRadius: 'var(--radius-lg)' }}>
      <h3 style={{ marginBottom: '16px', color: 'var(--primary)' }}>Gestión Dinámica de Enlaces (Vercel KV)</h3>
      <p style={{ marginBottom: '20px', color: 'var(--text-secondary)', fontSize: '14px' }}>
        Modifica las URLs de los beneficios o márcalos como inactivos. Los cambios se reflejarán instantáneamente para todos los ciudadanos.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '500px', overflowY: 'auto', paddingRight: '10px' }}>
        {benefits.map(benefit => (
          <div key={benefit.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '16px', background: 'rgba(255,255,255,0.7)', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: 600, color: '#0f172a' }}>{benefit.title}</div>
            
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                defaultValue={benefit.url}
                onBlur={(e) => {
                  if (e.target.value !== benefit.url) {
                    handleUpdate(benefit.id, e.target.value, benefit.linkStatus || 'up');
                  }
                }}
                disabled={savingId === benefit.id}
                style={{ flex: 1, padding: '8px 12px', borderRadius: '4px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                placeholder="URL del beneficio"
              />
              
              <select
                value={benefit.linkStatus || 'up'}
                onChange={(e) => handleUpdate(benefit.id, benefit.url, e.target.value as 'up' | 'down')}
                disabled={savingId === benefit.id}
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #cbd5e1',
                  background: benefit.linkStatus === 'down' ? '#fee2e2' : '#dcfce3',
                  color: benefit.linkStatus === 'down' ? '#991b1b' : '#166534',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                <option value="up">En línea (Activo)</option>
                <option value="down">Caído (Inactivo)</option>
              </select>

              {savingId === benefit.id && <span style={{ fontSize: '12px', color: '#0ea5e9' }}>Guardando...</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
