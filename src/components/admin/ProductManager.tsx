'use client';
import { useState, useEffect } from 'react';
import { upload } from '@vercel/blob/client';
import { Product } from '@/types';

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, image: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/content').then(r => r.json()).then(d => setProducts(d.products || [])).catch(() => {});
  }, []);

  const handleImageUpload = async (file: File) => {
    setLoading(true);
    const blob = await upload(file.name, file, {
      access: 'public',
      handleUploadUrl: '/api/blob-upload',
    });
    setNewProduct(prev => ({ ...prev, image: blob.url }));
    setLoading(false);
  };

  const addProduct = () => {
    if (!newProduct.name || !newProduct.image) return alert('Nombre e imagen requeridos');
    const p: Product = {
      id: crypto.randomUUID(),
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      image: newProduct.image,
      images: [newProduct.image],
      category: 'catalogo',
      available: true,
    };
    setProducts(prev => [...prev, p]);
    setNewProduct({ name: '', description: '', price: 0, image: '' });
  };

  const removeProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));

  const save = async () => {
    const res = await fetch('/api/content');
    const content = await res.json();
    content.products = products;
    await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Password': localStorage.getItem('adminPass') || '' },
      body: JSON.stringify(content),
    });
    alert('Productos guardados');
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 border border-gray-200">
        <h3 className="font-heading text-lg mb-4">Agregar producto</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input placeholder="Nombre" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="border border-gray-200 p-3" />
          <input type="number" placeholder="Precio" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: +e.target.value })} className="border border-gray-200 p-3" />
          <textarea placeholder="Descripción" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="border border-gray-200 p-3 md:col-span-2" rows={2} />
          <div>
            <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0])} className="w-full" />
            {newProduct.image && <img src={newProduct.image} alt="" className="mt-2 w-20 h-20 object-cover" />}
          </div>
          <button onClick={addProduct} disabled={loading} className="btn-primary">{loading ? 'Subiendo...' : 'Agregar'}</button>
        </div>
      </div>
      <div>
        <h3 className="font-heading text-lg mb-4">Productos ({products.length})</h3>
        {products.map(p => (
          <div key={p.id} className="flex items-center gap-4 py-3 border-b border-gray-100">
            <img src={p.image} alt="" className="w-14 h-14 object-cover" />
            <div className="flex-1">
              <p className="font-heading">{p.name}</p>
              <p className="font-sans text-sm text-olive">${p.price.toLocaleString()}</p>
            </div>
            <button onClick={() => removeProduct(p.id)} className="text-terracotta text-sm">Eliminar</button>
          </div>
        ))}
      </div>
      <button onClick={save} className="btn-primary">Guardar productos</button>
    </div>
  );
}   