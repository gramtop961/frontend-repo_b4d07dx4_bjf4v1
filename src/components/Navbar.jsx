import { ShoppingCart } from 'lucide-react'

export default function Navbar({ cartCount, onOpenCart }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 rounded-lg bg-amber-400 shadow-inner" />
          <span className="font-extrabold text-xl tracking-tight">WaffleWorks</span>
        </a>
        <nav className="flex items-center gap-3">
          <a href="#menu" className="text-sm font-medium text-gray-700 hover:text-gray-900">Menu</a>
          <a href="#about" className="text-sm font-medium text-gray-700 hover:text-gray-900">About</a>
          <button onClick={onOpenCart} className="relative inline-flex items-center gap-2 bg-gray-900 text-white px-3 py-2 rounded-lg hover:bg-black transition">
            <ShoppingCart size={18} />
            <span className="text-sm font-semibold">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-amber-400 text-black font-bold px-2 py-0.5 rounded-full shadow">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
