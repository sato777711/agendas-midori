import { get, put } from '@vercel/blob';
import { NextResponse } from 'next/server';

const CONTENT_KEY = 'site-content';

export async function GET() {
  try {
    const blob = await get(CONTENT_KEY);
    if (!blob) return NextResponse.json({
      siteName: 'Agendas a Mano',
      tagline: 'Cuero, eco cuero y el arte de anotar',
      heroImage: '', aboutText: '', aboutImage: '',
      whatsapp: '5491100000000', instagram: 'tuusuario',
      email: 'tu@email.com', city: 'Buenos Aires',
      products: [], gallery: [],
      customAgendaInfo: { minUnits: 3, daysAdvance: 10, options: ['A5', 'A6', 'B5'] },
    });
    const data = await blob.text();
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({
      siteName: 'Agendas a Mano',
      tagline: 'Cuero, eco cuero y el arte de anotar',
      heroImage: '', aboutText: '', aboutImage: '',
      whatsapp: '5491100000000', instagram: 'tuusuario',
      email: 'tu@email.com', city: 'Buenos Aires',
      products: [], gallery: [],
      customAgendaInfo: { minUnits: 3, daysAdvance: 10, options: ['A5', 'A6', 'B5'] },
    });
  }
}

export async function POST(request: Request) {
  const password = request.headers.get('x-admin-password');
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const content = await request.json();
  await put(CONTENT_KEY, JSON.stringify(content), {
    access: 'public',
    contentType: 'application/json',
  });
  return NextResponse.json({ success: true });
}   