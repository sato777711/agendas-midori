'use client';
import { useCart } from '@/store/cart';
import Link from 'next/link';

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <div className="py-16 px-4 max-w-3xl mx-auto">
      <h1 className="section-title text-center mb-12">Tu carrito</h1>
      {items.length === 0 ? (
        <div className="text-center">
          <p className="font-body text-lg mb-6">Tu carrito está vacío.</p>
          <Link href="/catalogo" className="btn-primary inline-block">Ver catálogo</Link>
        </div>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center gap-4 py-4 border-b border-tan/20">
              <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover" />
              <div className="flex-1">
                <h3 className="font-heading">{item.product.name}</h3>
                <p className="font-sans text-olive">${item.product.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 border border-tan">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 border border-tan">+</button>
              </div>
              <button onClick={() => removeItem(item.product.id)} className="text-terracotta text-sm ml-4">Quitar</button>
            </div>
          ))}
          <div className="mt-8 flex justify-between items-center">
            <p className="font-heading text-2xl">Total: ${total().toLocaleString()}</p>
            <Link href="/checkout" className="btn-primary">Finalizar compra</Link>
          </div>
        </div>
      )}
    </div>
  );
}   