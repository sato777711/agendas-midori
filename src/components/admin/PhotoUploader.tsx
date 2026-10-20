'use client';
import { useState, useRef } from 'react';
import { upload } from '@vercel/blob/client';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableImage({ src, onDelete }: { src: string; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: src });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className={`relative p-2 border ${isDragging ? 'border-olive bg-olive/10' : 'border-gray-200'}`}>
      <img src={src} alt="" className="w-full h-32 object-cover" />
      <div className="flex justify-between mt-1">
        <button {...attributes} {...listeners} className="cursor-grab text-xs text-gray-400">⠿ arrastrar</button>
        <button onClick={onDelete} className="text-xs text-terracotta">Eliminar</button>
      </div>
    </div>
  );
}

export default function PhotoUploader() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));

  const handleUpload = async (files: FileList) => {
    setLoading(true);
    for (const file of Array.from(files)) {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/blob-upload',
      });
      setImages(prev => [...prev, blob.url]);
    }
    setLoading(false);
  };

  const handleDragEnd = (e: any) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setImages(prev => {
        const oldIndex = prev.indexOf(active.id as string);
        const newIndex = prev.indexOf(over.id as string);
        const arr = [...prev];
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
        return arr;
      });
    }
  };

  const save = async () => {
    const res = await fetch('/api/content');
    const content = await res.json();
    content.gallery = images;
    await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Password': localStorage.getItem('adminPass') || '' },
      body: JSON.stringify(content),
    });
    alert('Galería guardada');
  };

  return (
    <div>
      <div className="mb-4">
        <button onClick={() => inputRef.current?.click()} className="btn-primary">
          {loading ? 'Subiendo...' : 'Subir fotos'}
        </button>
        <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={e => e.target.files && handleUpload(e.target.files)} />
      </div>
      {images.length > 0 && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={images} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map(src => (
                <SortableImage key={src} src={src} onDelete={() => setImages(prev => prev.filter(i => i !== src))} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
      <button onClick={save} className="btn-primary mt-6">Guardar galería</button>
    </div>
  );
}   