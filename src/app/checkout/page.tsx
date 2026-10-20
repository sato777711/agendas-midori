'use client';
import { useState } from 'react';
import { useCart } from '@/store/cart';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    delivery: 'encuentro', address: '',
    payment: 'whatsapp',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemsText = items.map(i => `• ${i.product.name} x${i.quantity} = $${(i.product.price * i.quantity).toLocaleString()}`).join('\n');
    const msg = `Hola! Hice un pedido:
${itemsText}
Total: $${total().toLocaleString()}

Nombre: ${form.name}
Tel: ${form.phone}
Email: ${form.email}
Entrega: ${form.delivery === 'envio' ? `Envío a ${form.address}` : 'Punto de encuentro'}
Pago: ${form.payment}`;
    const wa = `https://wa.me/5491100000000?text=${encodeURIComponent(msg)}`;
    window.open(wa, '_blank');
    setSent(true);
    clearCart();
  };

  if (sent) return (
    <div className="py-32 text-center">
      <h1 className="section-title mb-4">¡Pedido enviado!</h1>
      <p className="font-body text-lg">Te voy a responder por WhatsApp a la brevedad.</p>
    </div>
  );

  return (
    <div className="py-16 px-4 max-w-2xl mx-auto">
      <h1 className="section-title text-center mb-12">Finalizar compra</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="font-sans text-sm block mb-1">Nombre *</label>
          <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border border-tan/40 p-3 bg-white" />
        </div>
        <div>
          <label className="font-sans text-sm block mb-1">Email *</label>
          <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border border-tan/40 p-3 bg-white" />
        </div>
        <div>
          <label className="font-sans text-sm block mb-1">Teléfono *</label>
          <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full border border-tan/40 p-3 bg-white" />
        </div>
        <div>
          <label className="font-sans text-sm block mb-2">Entrega</label>
          <label className="flex items-center gap-2 mb-2 cursor-pointer">
            <input type="radio" checked={form.delivery === 'encuentro'} onChange={() => setForm({...form, delivery: 'encuentro'})} />
            Punto de encuentro (sin costo)
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={form.delivery === 'envio'} onChange={() => setForm({...form, delivery: 'envio'})} />
            Envío a domicilio
          </label>
          {form.delivery === 'envio' && (
            <input placeholder="Calle, número, piso, ciudad, CP" value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full border border-tan/40 p-3 bg-white mt-2" />
          )}
        </div>
        <div>
          <label className="font-sans text-sm block mb-2">Método de pago</label>
          <label className="flex items-center gap-2 mb-2 cursor-pointer">
            <input type="radio" checked={form.payment === 'whatsapp'} onChange={() => setForm({...form, payment: 'whatsapp'})} />
            WhatsApp (coordinamos)
          </label>
          <label className="flex items-center gap-2 mb-2 cursor-pointer">
            <input type="radio" checked={form.payment === 'transferencia'} onChange={() => setForm({...form, payment: 'transferencia'})} />
            Transferencia bancaria
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={form.payment === 'tarjeta'} onChange={() => setForm({...form, payment: 'tarjeta'})} />
            Tarjeta (Mercado Pago)
          </label>
        </div>
        <div className="pt-4 border-t border-tan/20">
          <p className="font-heading text-xl mb-4">Total: ${total().toLocaleString()}</p>
          <button type="submit" className="btn-primary w-full">Confirmar pedido</button>
        </div>
      </form>
    </div>
  );
}   