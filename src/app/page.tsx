const DEFAULT_CONTENT = {
  siteName: 'Agendas a Mano',
  tagline: 'Cuero, eco cuero y el arte de anotar',
  heroImage: '',
  aboutText: 'Llevo años trabajando con cuero...',
  aboutImage: '',
  whatsapp: '5491100000000',
  instagram: 'tuusuario',
  email: 'tu@email.com',
  city: 'Buenos Aires',
  products: [] as any[],
  gallery: [] as string[],
  customAgendaInfo: { minUnits: 3, daysAdvance: 10, options: ['A5', 'A6', 'B5'] },
};

export default async function Home() {
  let content = DEFAULT_CONTENT;
  try {
    const res = await fetch('/api/content', { cache: 'no-store' });
    if (res.ok) content = await res.json();
  } catch {}

  return (
    <div>
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {content.heroImage ? (
          <img src={content.heroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-linen" />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-brand text-5xl md:text-7xl italic mb-4">{content.siteName}</h1>
          <p className="font-heading text-xl md:text-2xl opacity-90">{content.tagline}</p>
        </div>
      </section>

      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="section-title text-center mb-4">Catálogo</h2>
        <p className="section-subtitle text-center mb-12">Agendas Midori forradas a mano</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.products.slice(0, 6).map((p: any) => (
            <div key={p.id} className="group">
              <div className="overflow-hidden aspect-square bg-linen">
                {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
              </div>
              <h3 className="font-heading text-lg mt-4">{p.name}</h3>
              <p className="font-sans text-olive mt-1">${p.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="/catalogo" className="btn-primary inline-block">Ver todo el catálogo</a>
        </div>
      </section>

      <section className="py-20 bg-linen px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title mb-6">Sobre mí</h2>
            <p className="font-body text-lg leading-relaxed text-coffee/80">{content.aboutText}</p>
            <a href="/sobre-mi" className="btn-outline inline-block mt-6">Conocer más</a>
          </div>
          {content.aboutImage && (
            <img src={content.aboutImage} alt="Sobre mí" className="w-full aspect-[4/5] object-cover" />
          )}
        </div>
      </section>

      <section className="py-20 px-4 text-center">
        <h2 className="section-title mb-4">Agendas Personalizadas</h2>
        <p className="font-body text-lg max-w-2xl mx-auto mb-8">
          Armamos agendas a tu medida. {content.customAgendaInfo.daysAdvance} días hábiles de anticipación.
          Mínimo {content.customAgendaInfo.minUnits} unidades.
        </p>
        <a href="/personalizadas" className="btn-primary inline-block">Ver opciones</a>
      </section>
    </div>
  );
}   