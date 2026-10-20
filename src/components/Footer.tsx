export default function Footer() {
  return (
    <footer className="bg-coffee text-cream/80 py-12 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-brand text-xl italic text-white mb-4">Agendas a Mano</h3>
          <p className="font-body text-sm">Cuero, eco cuero y el arte de anotar.</p>
        </div>
        <div>
          <h4 className="font-sans text-sm uppercase tracking-wide mb-4">Contacto</h4>
          <p className="font-body text-sm">WhatsApp: +54 9 11 0000-0000</p>
          <p className="font-body text-sm">Instagram: @tuusuario</p>
        </div>
        <div>
          <h4 className="font-sans text-sm uppercase tracking-wide mb-4">Enlaces</h4>
          <p className="font-body text-sm"><a href="/catalogo" className="hover:text-white">Catálogo</a></p>
          <p className="font-body text-sm"><a href="/personalizadas" className="hover:text-white">Personalizadas</a></p>
          <p className="font-body text-sm"><a href="/sobre-mi" className="hover:text-white">Sobre mí</a></p>
        </div>
      </div>
      <div className="text-center mt-8 font-sans text-xs opacity-50">
        © 2026 Agendas a Mano. Todos los derechos reservados.
      </div>
    </footer>
  );
}   
