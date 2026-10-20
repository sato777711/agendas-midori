'use client';
import { useCart } from '@/store/cart';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, total, removeItem } = useCart();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={toggleCart} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-brand text-2xl italic">Carrito</h2>
          <button onClick={toggleCart} className="text-2xl">&times;</button>
        </div>
        {items.length === 0 ? (
          <p className="font-body">Tu carrito está vacío.</p>
        ) : (
          <>
            {items.map(item => (
              <div key={item.product.id} className="flex items-center gap-3 py-3 border-b border-gray-100">
                <img src={item.product.image} alt="" className="w-16 h-16 object-cover" />
                <div className="flex-1">
                  <p className="font-heading text-sm">{item.product.name}</p>
                  <p className="font-sans text-xs text-olive">${item.product.price.toLocaleString()} x{item.quantity}</p>
                </div>
                <button onClick={() => removeItem(item.product.id)} className="text-terracotta text-xs">Quitar</button>
              </div>
            ))}
            <div className="mt-6 flex justify-between items-center">
              <p className="font-heading text-lg">Total: ${total().toLocaleString()}</p>
              <Link href="/checkout" onClick={toggleCart} className="btn-primary text-sm">Finalizar</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}   