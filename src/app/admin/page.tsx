'use client';
import { useState } from 'react';
import PhotoUploader from '@/components/admin/PhotoUploader';
import ContentEditor from '@/components/admin/ContentEditor';
import ProductManager from '@/components/admin/ProductManager';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<'content' | 'photos' | 'products'>('content');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      localStorage.setItem('adminPass', password);
      setAuthed(true);
    }
  };

  if (!authed) return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="space-y-4">
        <h1 className="font-brand text-3xl italic text-center mb-6">Admin</h1>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-64 border border-tan/40 p-3 bg-white" />
        <button className="btn-primary w-64">Entrar</button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="font-brand text-3xl italic mb-6">Panel de Administración</h1>
        <div className="flex gap-2 mb-8">
          {(['content', 'photos', 'products'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 font-sans text-sm ${tab === t ? 'bg-olive text-white' : 'bg-white border border-gray-200'}`}>
              {t === 'content' ? 'Contenido' : t === 'photos' ? 'Fotos' : 'Productos'}
            </button>
          ))}
        </div>
        {tab === 'content' && <ContentEditor />}
        {tab === 'photos' && <PhotoUploader />}
        {tab === 'products' && <ProductManager />}
      </div>
    </div>
  );
}   