export default function CartDrawer({ open, items, onClose, onCheckout, onInc, onDec }) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  const tax = +(subtotal * 0.07).toFixed(2)
  const total = +(subtotal + tax).toFixed(2)

  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[380px] bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-black/5 flex items-center justify-between">
          <h2 className="font-bold text-lg">Your Cart</h2>
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">Close</button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-200px)]">
          {items.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex items-center gap-3">
                <div className="w-16 h-16 rounded bg-amber-50 overflow-hidden">
                  {it.image ? <img src={it.image} alt={it.name} className="w-full h-full object-cover"/> : <div className="grid place-items-center w-full h-full">🥞</div>}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{it.name}</h4>
                    <span className="font-bold">${(it.price * it.quantity).toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500">${it.price.toFixed(2)} each</p>
                  <div className="mt-2 inline-flex items-center gap-2">
                    <button onClick={() => onDec(it.id)} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">-</button>
                    <span className="min-w-6 text-center">{it.quantity}</span>
                    <button onClick={() => onInc(it.id)} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t border-black/5">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Tax (7%)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-base font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button onClick={() => onCheckout({ subtotal, tax, total })} className="mt-4 w-full bg-gray-900 hover:bg-black text-white font-semibold py-2 rounded-lg disabled:opacity-50" disabled={items.length===0}>
            Checkout
          </button>
        </div>
      </aside>
    </div>
  )
}
