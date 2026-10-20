const DEFAULT_CONTENT = { products: [] as any[] };

export default async function CatalogoPage() {
  let content = DEFAULT_CONTENT;
  try {
    const res = await fetch('/api/content', { cache: 'no-store' });
    if (res.ok) content = await res.json();
  } catch {}

  return (
    <div className="py-16 px-4 max-w-6xl mx-auto">
      <h1 className="section-title text-center mb-12">Catálogo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content.products.map((p: any) => (
          <div key={p.id} className="group">
            <div className="overflow-hidden aspect-square bg-linen">
              {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
            </div>
            <h3 className="font-heading text-xl mt-4">{p.name}</h3>
            <p className="font-body text-tan mt-1 line-clamp-2">{p.description}</p>
            <p className="font-sans text-olive text-lg mt-2">${p.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
      {content.products.length === 0 && (
        <p className="text-center font-body text-lg text-tan mt-12">Próximamente...</p>
      )}
    </div>
  );
}   