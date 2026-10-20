export default async function SobreMiPage() {
  let content: any = { aboutText: '', aboutImage: '', siteName: '' };
  try {
    const res = await fetch('/api/content', { cache: 'no-store' });
    if (res.ok) content = await res.json();
  } catch {}

  return (
    <div className="py-16 px-4 max-w-4xl mx-auto">
      <h1 className="section-title text-center mb-12">Sobre mí</h1>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {content.aboutImage && (
          <img src={content.aboutImage} alt="Sobre mí" className="w-full aspect-[4/5] object-cover" />
        )}
        <div>
          <p className="font-body text-lg leading-relaxed whitespace-pre-line">{content.aboutText}</p>
        </div>
      </div>
    </div>
  );
}   