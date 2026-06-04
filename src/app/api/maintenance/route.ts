import { NextResponse } from 'next/server';
import { getMaintenanceState, setMaintenanceState } from '@/lib/db';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const isMaintenance = await getMaintenanceState();
    return NextResponse.json({ success: true, isMaintenance });
  } catch (error) {
    return NextResponse.json({ success: false, isMaintenance: false });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { isMaintenance, adminName } = body;
    
    if (typeof isMaintenance !== 'boolean') {
      return NextResponse.json({ success: false, error: 'Invalid state' }, { status: 400 });
    }
    
    await setMaintenanceState(isMaintenance);
    
    // Registrar el evento en los logs de la base de datos
    if (isMaintenance) {
      await logger.warn(`Modo de mantenimiento ACTIVADO por ${adminName || 'Admin'}`);
    } else {
      await logger.info(`Modo de mantenimiento DESACTIVADO por ${adminName || 'Admin'}`);
    }
    
    return NextResponse.json({ success: true, isMaintenance });
  } catch (error) {
    await logger.error("Fallo al intentar cambiar estado de mantenimiento");
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
