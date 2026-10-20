'use client';
import { useState, useEffect } from 'react';

const DEFAULTS = {
  siteName: 'Agendas a Mano',
  tagline: 'Cuero, eco cuero y el arte de anotar',
  heroImage: '',
  aboutText: '',
  aboutImage: '',
  whatsapp: '5491100000000',
  instagram: 'tuusuario',
  email: 'tu@email.com',
  city: 'Buenos Aires',
};

export default function ContentEditor() {
  const [content, setContent] = useState(DEFAULTS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/content').then(r => r.json()).then(d => setContent({ ...DEFAULTS, ...d })).catch(() => {});
  }, []);

  const save = async () => {
    const res = await fetch('/api/content');
    const full = await res.json();
    const updated = { ...full, ...content };
    await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Password': localStorage.getItem('adminPass') || '' },
      body: JSON.stringify(updated),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const field = (key: keyof typeof DEFAULTS, label: string, textarea = false) => (
    <div key={key}>
      <label className="font-sans text-sm block mb-1">{label}</label>
      {textarea ? (
        <textarea value={(content as any)[key]} onChange={e => setContent({ ...content, [key]: e.target.value })} rows={4} className="w-full border border-gray-200 p-3" />
      ) : (
        <input value={(content as any)[key]} onChange={e => setContent({ ...content, [key]: e.target.value })} className="w-full border border-gray-200 p-3" />
      )}
    </div>
  );

  return (
    <div className="space-y-4 max-w-2xl">
      {field('siteName', 'Nombre del sitio')}
      {field('tagline', 'Tagline')}
      {field('heroImage', 'URL imagen hero (pegá la URL de Vercel Blob)')}
      {field('aboutText', 'Texto "Sobre mí"', true)}
      {field('aboutImage', 'URL imagen "Sobre mí"')}
      {field('whatsapp', 'WhatsApp (con código de país, ej: 5491100000000)')}
      {field('instagram', 'Instagram (@usuario)')}
      {field('email', 'Email')}
      {field('city', 'Ciudad')}
      <button onClick={save} className="btn-primary">{saved ? '✅ Guardado' : 'Guardar cambios'}</button>
    </div>
  );
}   