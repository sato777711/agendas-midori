'use client';
import { useCart } from '@/store/cart';
import { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const toggleCart = useCart((s) => s.toggleCart);

  return (
    <div className="group">
      <div className="overflow-hidden aspect-square bg-linen">
        {product.image && (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        )}
      </div>
      <h3 className="font-heading text-xl mt-4">{product.name}</h3>
      <p className="font-body text-tan mt-1 line-clamp-2">{product.description}</p>
      <div className="flex items-center justify-between mt-3">
        <p className="font-sans text-olive text-lg">${product.price.toLocaleString()}</p>
        <button onClick={() => { addItem(product); toggleCart(); }} className="btn-outline text-xs px-4 py-2">
          Agregar
        </button>
      </div>
    </div>
  );
}   