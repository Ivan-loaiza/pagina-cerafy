import { Instagram, Facebook, Phone } from 'lucide-react';
import { EnsaladasCarousel, BatidosCarousel } from './components/ProductCarousel';
import { OrderForm } from './components/OrderForm';
import logo from 'figma:asset/97f36497aced348b79c38ca1e1b09d55aba17acd.png';
import menuImage from '../imports/image.png';
import preciosEnsaladas from '../imports/precios-ensaladas.png';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-yellow-50 to-pink-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            {/* Logo */}
            <img
              src={logo}
              alt="Frutas la colocha"
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain flex-shrink-0"
            />
            {/* Título centro */}
            <div className="text-center flex-1 min-w-0">
              <h1 className="text-xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 leading-tight">
                Frutas La Colocha
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Frescura y sabor en cada bocado</p>
            </div>
            {/* Sinpe */}
            <div className="text-right flex-shrink-0">
              <p className="text-gray-500 text-xs sm:text-sm">Sinpe</p>
              <p className="text-gray-700 text-xs sm:text-base font-medium">8666-4793</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Welcome Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl mb-3 text-gray-800">
            Nuestros Productos Frescos
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-2">
            Descubre nuestra deliciosa selección de ensaladas de frutas y batidos Naturales,
            preparados con ingredientes frescos y naturales
          </p>
        </div>

        {/* Frutas Frecuentes */}
        <div className="mb-10 sm:mb-16 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 lg:p-12">
          <h3 className="text-xl sm:text-2xl lg:text-3xl mb-2 text-center text-gray-800">
            Frutas que trabajo muy frecuentemente
          </h3>
          <p className="text-center text-gray-400 text-sm sm:text-base mb-8">
            Ingredientes estrella que encontrarás siempre frescos en nuestros productos
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {[
              { emoji: '🍇', name: 'Uvas', color: 'from-purple-400 to-purple-300', border: 'border-purple-100' },
              { emoji: '🍉', name: 'Sandía', color: 'from-red-400 to-pink-300', border: 'border-red-100' },
              { emoji: '🍍', name: 'Piña', color: 'from-yellow-400 to-orange-300', border: 'border-yellow-100' },
              { emoji: '🍌', name: 'Banano', color: 'from-yellow-300 to-yellow-200', border: 'border-yellow-100' },
              { emoji: '🍎', name: 'Manzana Gala', color: 'from-red-300 to-rose-200', border: 'border-rose-100' },
            ].map((fruta) => (
              <div
                key={fruta.name}
                className={`flex flex-col items-center gap-3 bg-white border ${fruta.border} rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 w-28 sm:w-32`}
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${fruta.color} flex items-center justify-center shadow-sm`}>
                  <span className="text-3xl sm:text-4xl">{fruta.emoji}</span>
                </div>
                <span className="text-gray-700 font-medium text-sm sm:text-base text-center leading-tight">{fruta.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Carrusel Ensaladas */}
        <EnsaladasCarousel />

        {/* Precios Ensaladas */}
        <div className="mb-10 sm:mb-16 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 lg:p-12">
          <h3 className="text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-6 text-center text-gray-800">
            Precios Ensaladas de Frutas
          </h3>
          <div className="flex justify-center">
            <img
              src={preciosEnsaladas}
              alt="Precios Ensaladas de Frutas"
              className="w-full max-w-sm sm:max-w-md h-auto rounded-xl sm:rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Carrusel Batidos */}
        <BatidosCarousel />

        {/* Menu de Sabores Section */}
        <div className="mt-10 sm:mt-16 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 lg:p-12">
          <h3 className="text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-6 text-center text-gray-800">
            Menú de Sabores de los Batidos
          </h3>
          <div className="flex justify-center">
            <img
              src={menuImage}
              alt="Menú de Sabores - En Agua y En Leche"
              className="w-full max-w-sm sm:max-w-lg h-auto rounded-xl sm:rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Horarios de Entrega */}
        <div className="mt-10 sm:mt-16 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 lg:p-12">
          {/* Título con gradiente igual al resto de la página */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl mb-1 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
            Horarios de Entrega
          </h3>
          <p className="text-center text-gray-400 text-sm sm:text-base mb-8 sm:mb-10">
            Entregas semanales frescas directo a tu zona
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6 sm:mb-8">
            {/* Lunes */}
            <div className="group relative overflow-hidden rounded-2xl bg-white border border-orange-100 shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5 flex items-center gap-4">
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-orange-400 to-orange-300" />
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-300 flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-white text-[10px] font-semibold uppercase tracking-wider leading-none">Lun</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 text-sm sm:text-base leading-tight">Frutas frescas</p>
                <p className="text-xs sm:text-sm text-orange-500 font-medium mt-0.5">📍 Nicoya</p>
                <p className="text-xs text-gray-400 mt-0.5">8:30 am – 11:00 am</p>
              </div>
            </div>

            {/* Martes */}
            <div className="group relative overflow-hidden rounded-2xl bg-white border border-pink-100 shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5 flex items-center gap-4">
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-pink-400 to-pink-300" />
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-400 to-pink-300 flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-white text-[10px] font-semibold uppercase tracking-wider leading-none">Mar</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 text-sm sm:text-base leading-tight">Batidos Naturales</p>
                <p className="text-xs sm:text-sm text-pink-500 font-medium mt-0.5">📍 Nicoya</p>
                <p className="text-xs text-gray-400 mt-0.5">11:00 am – 12:00 pm</p>
              </div>
            </div>

            {/* Miércoles */}
            <div className="group relative overflow-hidden rounded-2xl bg-white border border-orange-100 shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5 flex items-center gap-4">
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-orange-300 to-yellow-300" />
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-300 to-yellow-300 flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-white text-[10px] font-semibold uppercase tracking-wider leading-none">Mié</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 text-sm sm:text-base leading-tight">Frutas frescas</p>
                <p className="text-xs sm:text-sm text-orange-400 font-medium mt-0.5">📍 Nicoya</p>
                <p className="text-xs text-gray-400 mt-0.5">8:30 am – 11:00 am</p>
              </div>
            </div>

            {/* Jueves */}
            <div className="group relative overflow-hidden rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5 flex items-center gap-4">
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-gradient-to-b from-purple-400 to-pink-400" />
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-white text-[10px] font-semibold uppercase tracking-wider leading-none">Jue</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 text-sm sm:text-base leading-tight">Frutas frescas</p>
                <p className="text-xs sm:text-sm text-purple-500 font-medium mt-0.5">📍 Santa Cruz</p>
                <p className="text-xs text-gray-400 mt-0.5">8:30 am – 11:00 am</p>
              </div>
            </div>
          </div>

          {/* Pedidos especiales */}
          <div className="rounded-2xl bg-gradient-to-r from-orange-50 via-pink-50 to-purple-50 border border-pink-100 p-4 sm:p-5 flex items-start gap-3">
            <span className="text-xl flex-shrink-0 mt-0.5">🎉</span>
            <div>
              <p className="font-semibold text-gray-800 text-sm sm:text-base">Pedidos para eventos especiales</p>
              <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">
                ¿Tenés algo especial que celebrar? Hacé tu pedido con{' '}
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                  2 días de anticipación
                </span>{' '}
                y lo preparamos con todo el amor.
              </p>
            </div>
          </div>
        </div>

        {/* Order Form */}
        <OrderForm />
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm mt-10 sm:mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h4 className="mb-4 text-gray-800 text-sm sm:text-base">Síguenos en nuestras redes sociales</h4>
            <div className="flex justify-center gap-5 sm:gap-6">
              <a
                href="https://instagram.com/Ce_torres22"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://tiktok.com/@ce29_07"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-black text-white rounded-full hover:scale-110 transition-transform shadow-lg"
                aria-label="TikTok"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com/Ce%20Guevara"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform shadow-lg"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
            <p className="mt-6 text-gray-600">
              © 2026 Frutas La Colocha. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/50686664793?text=Hola!%20Quiero%20hacer%20un%20pedido"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-green-500 active:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-2xl transition-all z-50 animate-bounce touch-manipulation"
        aria-label="WhatsApp"
      >
        <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>
    </div>
  );
}