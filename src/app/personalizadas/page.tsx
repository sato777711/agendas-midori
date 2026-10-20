const DEFAULT_CONTENT = {
  customAgendaInfo: { minUnits: 3, daysAdvance: 10, options: ['A5', 'A6', 'B5'] },
  whatsapp: '5491100000000',
};

export default async function PersonalizadasPage() {
  let content = DEFAULT_CONTENT;
  try {
    const res = await fetch('/api/content', { cache: 'no-store' });
    if (res.ok) content = await res.json();
  } catch {}

  const info = content.customAgendaInfo;
  const waLink = `https://wa.me/${content.whatsapp}?text=${encodeURIComponent('Hola! Quiero cotizar agendas personalizadas.')}`;

  return (
    <div className="py-16 px-4 max-w-4xl mx-auto">
      <h1 className="section-title text-center mb-12">Agendas a tu medida</h1>
      <div className="bg-linen p-8 md:p-12 mb-12">
        <h2 className="font-heading text-2xl mb-6">Cómo funciona</h2>
        <ul className="space-y-4 font-body text-lg">
          <li>📐 Elegís el tamaño: {info.options.join(' / ')}</li>
          <li>🎨 Elegís el material: Cuero natural / Eco cuero</li>
          <li>✍️ Personalización: Nombre grabado, logo, dedicatoria</li>
          <li>📅 {info.daysAdvance} días hábiles de anticipación</li>
          <li>📦 Mínimo {info.minUnits} unidades por pedido</li>
        </ul>
      </div>
      <div className="text-center">
        <a href={waLink} target="_blank" className="btn-primary inline-block text-lg">
          Cotizar por WhatsApp
        </a>
      </div>
    </div>
  );
}   