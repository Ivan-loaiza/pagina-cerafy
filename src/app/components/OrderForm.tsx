import { useState } from 'react';
import { Phone, ShoppingCart, Plus, Minus, Trash2, User, MapPin, Navigation } from 'lucide-react';

// ── Catálogo ────────────────────────────────────────────────────────────────
const ENSALADAS = [
  { id: 'ensalada-pequena', label: 'Ensalada Pequeña', emoji: '🥗', price: 1000 },
  { id: 'ensalada-grande',  label: 'Ensalada Grande',  emoji: '🥗', price: 2000 },
];

// Solo aplica a la zona de Nicoya — en Santa Cruz no se ofrece domicilio
const DELIVERY_DISTANCES = [
  { id: 'cerca', label: 'Cerca del centro', price: 500 },
  { id: 'lejos', label: 'Más Lejano',     price: 1000 },
] as const;

const LOCATION_WHATSAPP = '50687114772'; // Número al que se envía la ubicación para domicilio

const BATIDOS_AGUA: { id: string; label: string; price: number }[] = [
  { id: 'batido-sandia-agua',        label: 'Sandía',          price: 1500 },
  { id: 'batido-pina-agua',          label: 'Piña',            price: 1500 },
  { id: 'batido-sandia-manzana-agua',label: 'Sandía y manzana',price: 1500 },
  { id: 'batido-pina-sandia-agua',   label: 'Piña y Sandía',   price: 1500 },
];

const BATIDOS_LECHE: { id: string; label: string; price: number }[] = [
  { id: 'batido-banano-leche',          label: 'Banano',                      price: 1800 },
  { id: 'batido-banano-chispas-leche',  label: 'Banano y chispas de chocolate',price: 1800 },
  { id: 'batido-sandia-leche',          label: 'Sandía',                      price: 1800 },
  { id: 'batido-pinol-leche',           label: 'Pinol (maíz molido)',          price: 1800 },
];

// ── Tipos ───────────────────────────────────────────────────────────────────
type CartItem = {
  id:        string;
  emoji:     string;
  label:     string;
  sublabel:  string;
  unitPrice: number;
  qty:       number;
};

function fmt(n: number) {
  return `₡${n.toLocaleString('es-CR')}`;
}

// ── Componente principal ────────────────────────────────────────────────────
export function OrderForm() {
  const [cart,  setCart]  = useState<CartItem[]>([]);
  const [notes, setNotes] = useState('');

  const [customerName, setCustomerName] = useState('');
  const [zone, setZone] = useState<'nicoya' | 'santacruz' | ''>('');
  const [wantsDelivery, setWantsDelivery] = useState(false);
  const [deliveryDistance, setDeliveryDistance] = useState<'cerca' | 'lejos'>('cerca');

  function selectZone(z: 'nicoya' | 'santacruz') {
    setZone(z);
    if (z === 'santacruz') setWantsDelivery(false);
  }

  const isDelivery   = zone === 'nicoya' && wantsDelivery;
  const deliveryFee  = isDelivery ? DELIVERY_DISTANCES.find(d => d.id === deliveryDistance)!.price : 0;
  const productsTotal = cart.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  const total    = productsTotal + deliveryFee;
  const canOrder = cart.length > 0 && customerName.trim() !== '' && zone !== '';

  // Agrega 1 unidad (o crea el ítem si no existe)
  function add(item: Omit<CartItem, 'qty'>) {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function setQty(id: string, qty: number) {
    if (qty < 1) { remove(id); return; }
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty } : c));
  }

  function remove(id: string) {
    setCart(prev => prev.filter(c => c.id !== id));
  }

  function buildLink() {
    const lines = ['¡Hola! Quiero hacer un pedido 🛒\n'];
    lines.push(`👤 Nombre: ${customerName.trim()}`);
    lines.push(`📍 Zona: ${zone === 'nicoya' ? 'Nicoya' : 'Santa Cruz'}`);
    if (isDelivery) {
      lines.push(`🛵 Entrega: A DOMICILIO (+${fmt(deliveryFee)})`);
      lines.push(`📌 Ya envié mi ubicación por WhatsApp al 8711-4772`);
    } else if (zone === 'nicoya') {
      lines.push(`🏬 Entrega: Retiro / entrega en el centro`);
    } else {
      lines.push(`🏬 Entrega: Punto céntrico de Santa Cruz`);
    }
    lines.push('');
    cart.forEach(i => {
      lines.push(`${i.emoji} ${i.label} (${i.sublabel}) x${i.qty} — ${fmt(i.unitPrice * i.qty)}`);
    });
    if (isDelivery) lines.push(`🛵 Domicilio — ${fmt(deliveryFee)}`);
    lines.push(`\n💰 Total: ${fmt(total)}`);
    if (notes.trim()) lines.push(`📝 Notas: ${notes.trim()}`);
    return `https://wa.me/50686664793?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  function buildLocationLink() {
    const lines = ['¡Hola! Necesito entrega a domicilio 🛵📍\n'];
    lines.push(`👤 Nombre: ${customerName.trim() || '(sin nombre)'}`);
    lines.push(`📍 Zona: Nicoya`);
    lines.push('');
    lines.push('Pedido:');
    cart.forEach(i => {
      lines.push(`${i.emoji} ${i.label} (${i.sublabel}) x${i.qty}`);
    });
    lines.push(`\n💰 Total (incluye domicilio): ${fmt(total)}`);
    if (notes.trim()) lines.push(`📝 Notas: ${notes.trim()}`);
    lines.push('\nTe comparto mi ubicación a continuación 👇');
    return `https://wa.me/${LOCATION_WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  return (
    <div className="mt-10 sm:mt-16 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 lg:p-12">

      {/* Título */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-10">
        <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500" />
        <h3 className="text-xl sm:text-2xl lg:text-3xl text-gray-800">Personaliza tu Pedido</h3>
      </div>

      {/* ── DATOS DEL CLIENTE ── */}
      <div className="mb-8">
        <p className="text-gray-500 text-sm font-medium mb-3 text-center uppercase tracking-wide">Tus datos</p>
        <div className="max-w-md mx-auto flex flex-col gap-4">
          {/* Nombre */}
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1 block">Nombre completo</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ej: María Rodríguez"
                className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 text-gray-700 focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>

          {/* Zona */}
          <div>
            <label className="text-xs text-gray-500 font-medium mb-2 block">Zona de entrega</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => selectZone('nicoya')}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-medium text-sm transition-colors touch-manipulation ${
                  zone === 'nicoya' ? 'border-orange-400 bg-orange-50 text-orange-600' : 'border-gray-200 text-gray-500'
                }`}
              >
                <MapPin className="w-4 h-4" /> Nicoya
              </button>
              <button
                type="button"
                onClick={() => selectZone('santacruz')}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-medium text-sm transition-colors touch-manipulation ${
                  zone === 'santacruz' ? 'border-purple-400 bg-purple-50 text-purple-600' : 'border-gray-200 text-gray-500'
                }`}
              >
                <MapPin className="w-4 h-4" /> Santa Cruz
              </button>
            </div>
          </div>

          {zone === 'santacruz' && (
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              📍 En Santa Cruz el servicio a domicilio no está disponible por ahora — la entrega es en el punto céntrico.
            </p>
          )}
        </div>
      </div>

      {/* ── MENÚ ENSALADAS ── */}
      <MenuSection title="🥗 Ensaladas de Frutas">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {ENSALADAS.map(e => (
            <MenuCard
              key={e.id}
              emoji={e.emoji}
              label={e.label}
              price={fmt(e.price)}
              inCart={cart.find(c => c.id === e.id)?.qty ?? 0}
              onAdd={() => add({ id: e.id, emoji: e.emoji, label: e.label, sublabel: e.label.replace('Ensalada ', ''), unitPrice: e.price })}
            />
          ))}
        </div>
      </MenuSection>

      {/* ── MENÚ BATIDOS ── */}
      <MenuSection title="🥤 Batidos">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* En Agua */}
          <div className="bg-blue-50 rounded-2xl p-4 sm:p-5 border-2 border-blue-100">
            <p className="text-blue-600 font-semibold mb-3 sm:mb-4 text-center">💧 En Agua — ₡1,500</p>
            <div className="flex flex-col gap-2">
              {BATIDOS_AGUA.map(b => (
                <FlavorRow
                  key={b.id}
                  label={b.label}
                  color="blue"
                  inCart={cart.find(c => c.id === b.id)?.qty ?? 0}
                  onAdd={() => add({ id: b.id, emoji: '🥤', label: b.label, sublabel: 'En Agua', unitPrice: b.price })}
                />
              ))}
            </div>
          </div>
          {/* En Leche */}
          <div className="bg-amber-50 rounded-2xl p-4 sm:p-5 border-2 border-amber-100">
            <p className="text-amber-700 font-semibold mb-3 sm:mb-4 text-center">🥛 En Leche — ₡1,800</p>
            <div className="flex flex-col gap-2">
              {BATIDOS_LECHE.map(b => (
                <FlavorRow
                  key={b.id}
                  label={b.label}
                  color="amber"
                  inCart={cart.find(c => c.id === b.id)?.qty ?? 0}
                  onAdd={() => add({ id: b.id, emoji: '🥤', label: b.label, sublabel: 'En Leche', unitPrice: b.price })}
                />
              ))}
            </div>
          </div>
        </div>
      </MenuSection>

      {/* ── CARRITO ── */}
      {cart.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-3 text-center">Tu pedido</p>
          <div className="border-2 border-orange-100 rounded-2xl overflow-hidden">
            {cart.map((item, idx) => (
              <div
                key={item.id}
                className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3 sm:py-4 ${idx < cart.length - 1 ? 'border-b border-orange-100' : ''}`}
              >
                <span className="text-lg sm:text-xl flex-shrink-0">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 text-xs sm:text-sm font-medium leading-tight truncate">{item.label}</p>
                  <p className="text-gray-400 text-xs">{item.sublabel}</p>
                </div>
                {/* Contador */}
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  <button
                    onClick={() => setQty(item.id, item.qty - 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 active:bg-orange-200 text-orange-600 transition-colors touch-manipulation"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-base font-bold text-gray-800 w-6 text-center">{item.qty}</span>
                  <button
                    onClick={() => setQty(item.id, item.qty + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 active:bg-orange-600 text-white transition-colors touch-manipulation"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                {/* Subtotal */}
                <span className="text-orange-600 font-semibold text-xs sm:text-sm w-14 sm:w-16 text-right flex-shrink-0">
                  {fmt(item.unitPrice * item.qty)}
                </span>
                {/* Eliminar */}
                <button
                  onClick={() => remove(item.id)}
                  className="ml-1 text-gray-300 active:text-red-400 transition-colors touch-manipulation flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            {/* Total */}
            <div className="px-4 sm:px-5 py-4 bg-orange-50 border-t-2 border-orange-200">
              {isDelivery && (
                <>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
                    <span>Subtotal</span>
                    <span>{fmt(productsTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                    <span>🛵 Domicilio</span>
                    <span>{fmt(deliveryFee)}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-700">Total</span>
                <span className="font-bold text-orange-600 text-lg">{fmt(total)}</span>
              </div>
            </div>
          </div>

          {/* ── ENTREGA (depende de la zona, ya con el pedido armado) ── */}
          {zone === 'nicoya' && (
            <div className="mt-4">
              <p className="text-gray-500 text-sm font-medium mb-3 text-center uppercase tracking-wide">¿Cómo lo recibís?</p>
              <div className="max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setWantsDelivery(false)}
                    className={`py-3 rounded-xl border-2 font-medium text-sm transition-colors touch-manipulation ${
                      !wantsDelivery ? 'border-orange-400 bg-orange-50 text-orange-600' : 'border-gray-200 text-gray-500'
                    }`}
                  >
                    🏬 Centro
                  </button>
                  <button
                    type="button"
                    onClick={() => setWantsDelivery(true)}
                    className={`py-3 rounded-xl border-2 font-medium text-sm transition-colors touch-manipulation ${
                      wantsDelivery ? 'border-orange-400 bg-orange-50 text-orange-600' : 'border-gray-200 text-gray-500'
                    }`}
                  >
                    🛵 A domicilio
                  </button>
                </div>

                {wantsDelivery && (
                  <div className="mt-3 bg-orange-50 border-2 border-orange-100 rounded-xl p-4">
                    <p className="text-xs text-gray-500 font-medium mb-2">¿Qué tan lejos está del centro?</p>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      {DELIVERY_DISTANCES.map(d => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setDeliveryDistance(d.id)}
                          className={`py-2.5 rounded-xl border-2 text-xs font-medium transition-colors touch-manipulation ${
                            deliveryDistance === d.id ? 'border-orange-400 bg-white text-orange-600' : 'border-gray-200 bg-white text-gray-500'
                          }`}
                        >
                          {d.label}<br />+{fmt(d.price)}
                        </button>
                      ))}
                    </div>
                    <a
                      href={buildLocationLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-orange-500 active:bg-orange-600 text-white px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors touch-manipulation w-full"
                    >
                      <Navigation className="w-3.5 h-3.5" /> Enviar pedido y ubicación por WhatsApp
                    </a>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      Se abrirá WhatsApp con el número 8711-4772 y el detalle de tu pedido ya escrito. Ahí adjunta tu ubicación (📎 → Ubicación) para que el repartidor sepa qué llevar y a dónde.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── NOTAS ── */}
      <div className="mb-8">
        <p className="text-gray-500 text-sm font-medium mb-3 text-center uppercase tracking-wide">Notas adicionales (opcional)</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ej: sin azúcar, para llevar, entregar a las 6pm..."
          rows={2}
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-orange-400 resize-none"
        />
      </div>

      {/* ── BOTÓN ── */}
      <div className="text-center">
        <a
          href={canOrder ? buildLink() : undefined}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => { if (!canOrder) e.preventDefault(); }}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white font-medium text-base sm:text-lg transition-all shadow-lg touch-manipulation ${
            canOrder
              ? 'bg-green-500 active:bg-green-600 hover:bg-green-600 hover:scale-105 cursor-pointer'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          <Phone className="w-5 h-5 flex-shrink-0" />
          Enviar pedido por WhatsApp
        </a>
        {!canOrder && (
          <p className="text-sm text-gray-400 mt-3">
            {customerName.trim() === ''
              ? 'Ingresa tu nombre para continuar'
              : zone === ''
              ? 'Selecciona tu zona de entrega para continuar'
              : 'Agrega al menos un producto para continuar'}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Sub-componentes ─────────────────────────────────────────────────────────

function MenuSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <p className="text-gray-700 font-semibold text-lg mb-4">{title}</p>
      {children}
    </div>
  );
}

function MenuCard({ emoji, label, price, inCart, onAdd }: {
  emoji: string; label: string; price: string; inCart: number; onAdd: () => void;
}) {
  return (
    <div className={`relative flex flex-col items-center gap-2 p-3 sm:p-5 rounded-2xl border-2 transition-all ${
      inCart > 0 ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-gray-50'
    }`}>
      {inCart > 0 && (
        <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {inCart}
        </span>
      )}
      <span className="text-2xl sm:text-3xl">{emoji}</span>
      <p className="text-xs sm:text-sm font-medium text-gray-700 text-center leading-tight">{label}</p>
      <p className="text-orange-500 font-bold text-sm sm:text-base">{price}</p>
      <button
        onClick={onAdd}
        className="mt-1 flex items-center gap-1 bg-orange-500 active:bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors touch-manipulation w-full justify-center"
      >
        <Plus className="w-3 h-3" /> Agregar
      </button>
    </div>
  );
}

function FlavorRow({ label, color, inCart, onAdd }: {
  label: string; color: 'blue' | 'amber'; inCart: number; onAdd: () => void;
}) {
  const btn = color === 'blue'
    ? 'bg-blue-500 active:bg-blue-600'
    : 'bg-amber-500 active:bg-amber-600';
  return (
    <div className="flex items-center justify-between gap-2 bg-white rounded-xl px-3 py-2.5">
      <span className="text-xs sm:text-sm text-gray-700 flex-1 leading-tight">{label}</span>
      {inCart > 0 && (
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white flex-shrink-0 ${color === 'blue' ? 'bg-blue-400' : 'bg-amber-400'}`}>
          x{inCart}
        </span>
      )}
      <button
        onClick={onAdd}
        className={`flex items-center gap-1 ${btn} text-white px-3 py-1.5 rounded-full text-xs font-medium transition-colors touch-manipulation flex-shrink-0`}
      >
        <Plus className="w-3 h-3" /> Agregar
      </button>
    </div>
  );
}
