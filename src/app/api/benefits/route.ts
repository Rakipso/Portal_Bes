import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { benefitsData as allBenefits } from '@/lib/constants';

// Forzar actualización dinámica, evitar caché estático
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const storedBenefits = await kv.get('benefits_list');
    
    if (!storedBenefits) {
      // Si la base de datos está vacía, la inicializamos con los beneficios por defecto
      await kv.set('benefits_list', allBenefits);
      return NextResponse.json(allBenefits);
    }
    
    return NextResponse.json(storedBenefits);
  } catch (error) {
    console.error('Error fetching benefits from KV:', error);
    // Fallback: si no hay conexión a KV (ej. falta .env), devolvemos los quemados
    return NextResponse.json(allBenefits);
  }
}

export async function PUT(request: Request) {
  try {
    const { id, url, linkStatus } = await request.json();
    
    if (typeof id !== 'number') {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    // Obtenemos la lista actual
    let benefits: any = await kv.get('benefits_list');
    if (!benefits) {
      benefits = [...allBenefits];
    }
    
    // Actualizamos el beneficio específico
    const updatedBenefits = benefits.map((b: any) => {
      if (b.id === id) {
        return { 
          ...b, 
          url: url !== undefined ? url : b.url, 
          linkStatus: linkStatus !== undefined ? linkStatus : b.linkStatus 
        };
      }
      return b;
    });

    // Guardamos la nueva lista en la base de datos
    await kv.set('benefits_list', updatedBenefits);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Beneficio actualizado correctamente'
    });
  } catch (error) {
    console.error('Error updating benefit in KV:', error);
    return NextResponse.json({ error: 'Error al actualizar el beneficio' }, { status: 500 });
  }
}
