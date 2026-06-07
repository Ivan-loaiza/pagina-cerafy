import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ensaladaModules = import.meta.glob(
  '../../imports/fotos ensaladas de frutas/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  { eager: true }
);
const batidoModules = import.meta.glob(
  '../../imports/fotos batidos/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  { eager: true }
);

function toImageUrls(modules: Record<string, unknown>): string[] {
  return Object.values(modules).map((m) => (m as { default: string }).default);
}

const ensaladaImages = toImageUrls(ensaladaModules);
const batidoImages   = toImageUrls(batidoModules);

const sliderStyles = `
  .slick-slider { width: 100%; box-sizing: border-box; }
  .slick-list { overflow: hidden; margin: 0; padding: 0 !important; }
  .slick-track { display: flex; align-items: stretch; }
  .slick-slide { box-sizing: border-box; padding: 0 6px; }
  .slick-slide > div { height: 100%; }
  .slick-dots { bottom: -30px; }
  .slick-dots li button:before { font-size: 10px; color: #f97316; }
  .slick-dots li.slick-active button:before { color: #f97316; }
  .slick-prev:before, .slick-next:before { color: #f97316; font-size: 28px; }
  .slick-prev { left: -30px; }
  .slick-next { right: -30px; }
  @media (max-width: 640px) {
    .slick-slide { padding: 0 4px; }
    .slick-prev, .slick-next { display: none !important; }
  }
`;

// ── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white text-2xl font-bold hover:bg-white/40 transition-colors touch-manipulation"
        aria-label="Cerrar"
      >
        ✕
      </button>

      {/* Imagen grande — toca fuera para cerrar */}
      <img
        src={src}
        alt="Vista ampliada"
        onClick={(e) => e.stopPropagation()}
        className="max-w-[95vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
      />
    </div>
  );
}

// ── Sección vacía ────────────────────────────────────────────────────────────
function EmptySection({ folderName }: { folderName: string }) {
  return (
    <div className="flex items-center justify-center h-48 bg-orange-50 rounded-2xl border-2 border-dashed border-orange-300">
      <p className="text-gray-400 text-center">
        Agrega fotos a la carpeta<br />
        <span className="font-medium text-orange-400">src/imports/{folderName}</span>
      </p>
    </div>
  );
}

// ── Carrusel con lightbox ─────────────────────────────────────────────────────
function Section({ title, images, folderName }: { title: string; images: string[]; folderName: string }) {
  const [selected, setSelected] = useState<string | null>(null);

  if (images.length === 0) {
    return (
      <div className="mb-16">
        <h2 className="text-xl sm:text-2xl lg:text-3xl mb-6 text-center text-gray-800">{title}</h2>
        <EmptySection folderName={folderName} />
      </div>
    );
  }

  const slidesToShow = Math.min(3, images.length);
  const settings = {
    dots: true,
    infinite: images.length > slidesToShow,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    swipe: true,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(2, images.length), slidesToScroll: 1, arrows: true } },
      { breakpoint: 640,  settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } },
    ],
  };

  return (
    <div className="mb-20">
      {selected && <Lightbox src={selected} onClose={() => setSelected(null)} />}

      <h2 className="text-xl sm:text-2xl lg:text-3xl mb-6 text-center text-gray-800">{title}</h2>
      <div className="relative px-0 sm:px-8 overflow-hidden sm:overflow-visible">
        <Slider {...settings}>
          {images.map((src, i) => (
            <div key={i}>
              <div
                className="mx-1 sm:mx-2 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer active:opacity-80 transition-opacity"
                onClick={() => setSelected(src)}
                title="Toca para ver en grande"
              >
                <div className="w-full" style={{ paddingBottom: '100%', position: 'relative' }}>
                  <img
                    src={src}
                    alt={`${title} ${i + 1}`}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Ícono de lupa en la esquina */}
                  <div className="absolute bottom-2 right-2 bg-black/40 rounded-full p-1.5">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export function EnsaladasCarousel() {
  return (
    <>
      <style>{sliderStyles}</style>
      <Section title="Ensaladas de Frutas" images={ensaladaImages} folderName="fotos ensaladas de frutas" />
    </>
  );
}

export function BatidosCarousel() {
  return (
    <>
      <style>{sliderStyles}</style>
      <Section title="Batidos" images={batidoImages} folderName="fotos batidos" />
    </>
  );
}
