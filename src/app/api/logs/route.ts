import { NextResponse } from 'next/server';
import { getLogs } from '@/lib/db';

export const dynamic = 'force-dynamic'; // Evitar que Next.js cachee esta ruta en Vercel

export async function GET() {
  try {
    const logs = await getLogs();
    return NextResponse.json({ success: true, logs });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch logs' }, { status: 500 });
  }
}
