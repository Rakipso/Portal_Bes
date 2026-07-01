import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // 1. Verificación de Seguridad: Asegurarnos de que fue Vercel quien llamó a este Cron
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      // Retornar no autorizado si la clave no coincide
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // 2. Obtener los beneficios actuales de la base de datos
    const benefits: any = await kv.get('benefits_list');
    
    if (!benefits || !Array.isArray(benefits)) {
      return NextResponse.json({ success: false, message: 'No hay beneficios para revisar' });
    }

    let changedCount = 0;

    // 3. Barrido Automático: Revisar cada URL
    const updatedBenefits = await Promise.all(
      benefits.map(async (benefit: any) => {
        if (!benefit.url || benefit.url === '#') return benefit;

        try {
          // Intentamos hacer un fetch (solo HEAD para no descargar toda la página)
          // Usamos AbortController para darle un timeout de 5 segundos
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);

          const response = await fetch(benefit.url, { 
            method: 'HEAD',
            signal: controller.signal 
          });
          
          clearTimeout(timeoutId);

          // Si la respuesta es de error (404, 500, etc) y estaba activo
          if (!response.ok && benefit.linkStatus !== 'down') {
            console.warn(`[CRON] Link caído detectado: ${benefit.title}`);
            changedCount++;
            return { ...benefit, linkStatus: 'down' };
          } 
          // Si el link volvió a estar arriba y estaba marcado como caído
          else if (response.ok && benefit.linkStatus === 'down') {
            console.log(`[CRON] Link recuperado: ${benefit.title}`);
            changedCount++;
            return { ...benefit, linkStatus: 'active' };
          }

          return benefit;
        } catch (error) {
          // Si hubo un error de red (timeout, servidor inaccesible)
          if (benefit.linkStatus !== 'down') {
            console.warn(`[CRON] Error de red al acceder a: ${benefit.title}`);
            changedCount++;
            return { ...benefit, linkStatus: 'down' };
          }
          return benefit;
        }
      })
    );

    // 4. Guardar resultados si hubo cambios
    if (changedCount > 0) {
      await kv.set('benefits_list', updatedBenefits);
      console.log(`[CRON] Barrido finalizado. ${changedCount} beneficios actualizados.`);
    } else {
      console.log(`[CRON] Barrido finalizado. Todos los enlaces están estables.`);
    }

    return NextResponse.json({ 
      success: true, 
      message: `Revisión completada. ${changedCount} cambios realizados.` 
    });

  } catch (error) {
    console.error('[CRON] Error crítico durante la ejecución:', error);
    return NextResponse.json({ success: false, error: 'Error interno del servidor' }, { status: 500 });
  }
}
