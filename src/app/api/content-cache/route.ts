import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
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
  try {
    const res = await fetch(
      `https://blob.vercel-storage.com/site-content?token=${token}`,
      { cache: 'no-store' }
    );
    if (!res.ok) {
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
    const data = await res.json();
    return NextResponse.json(data);
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
