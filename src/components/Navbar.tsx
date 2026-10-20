'use client';
import Link from 'next/link';
import { useCart } from '@/store/cart';

export default function Navbar() {
  const { items, toggleCart } = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-tan/20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-brand text-2xl italic">Agendas a Mano</Link>
        <div className="hidden md:flex gap-8 font-sans text-sm">
          <Link href="/catalogo" className="hover:text-olive transition-colors">Catálogo</Link>
          <Link href="/personalizadas" className="hover:text-olive transition-colors">Personalizadas</Link>
          <Link href="/sobre-mi" className="hover:text-olive transition-colors">Sobre mí</Link>
        </div>
        <button onClick={toggleCart} className="relative font-sans text-sm">
          Carrito
          {count > 0 && <span className="absolute -top-2 -right-3 bg-terracotta text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{count}</span>}
        </button>
      </div>
    </nav>
  );
}   