import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import WaffleCard from './components/WaffleCard'
import CartDrawer from './components/CartDrawer'

function App() {
  const [waffles, setWaffles] = useState([])
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${baseUrl}/api/waffles`)
        if (!res.ok) throw new Error('Failed to load menu')
        const data = await res.json()
        setWaffles(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [baseUrl])

  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.quantity, 0), [cart])

  const addToCart = (waffle) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === waffle.id)
      if (exists) {
        return prev.map((i) => (i.id === waffle.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [
        ...prev,
        { id: waffle.id, name: waffle.name, price: waffle.price, image: waffle.image, quantity: 1 },
      ]
    })
    setCartOpen(true)
  }

  const inc = (id) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)))
  const dec = (id) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i)))

  const checkout = async (totals) => {
    try {
      const items = cart.map((i) => ({ waffle_id: i.id, name: i.name, price: i.price, quantity: i.quantity }))
      const subtotal = +items.reduce((s, it) => s + it.price * it.quantity, 0).toFixed(2)
      const tax = +(subtotal * 0.07).toFixed(2)
      const total = +(subtotal + tax).toFixed(2)
      const order = {
        customer_name: 'Guest',
        customer_email: 'guest@example.com',
        customer_address: 'N/A',
        items,
        subtotal,
        tax,
        total,
      }
      const res = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      })
      if (!res.ok) throw new Error('Failed to place order')
      setCart([])
      alert('Order placed!')
      setCartOpen(false)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Navbar cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <main className="max-w-6xl mx-auto px-4">
        <section className="py-16 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900">Crispy. Fluffy. Irresistible.</h1>
          <p className="mt-4 text-lg text-gray-600">Freshly made waffles with premium toppings, delivered hot to your door.</p>
          <a href="#menu" className="inline-block mt-6 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-semibold">Shop the Menu</a>
        </section>

        <section id="menu" className="py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Our Waffles</h2>
            <button onClick={() => window.location.href = '/test'} className="text-sm text-gray-600 hover:text-gray-900">System Check</button>
          </div>
          {loading ? (
            <p>Loading menu...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {waffles.map((w) => (
                <WaffleCard key={w.id} waffle={w} onAdd={addToCart} />
              ))}
            </div>
          )}
        </section>

        <section id="about" className="py-16 border-t border-black/5">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-black/5 bg-white">
              <img src="https://images.unsplash.com/photo-1562376552-0d160a2f238d?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHx3YWZmbGVzfGVufDB8MHx8fDE3NjM0NDM3NTh8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="waffles" className="w-full h-full object-cover"/>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-gray-900">About WaffleWorks</h3>
              <p className="mt-4 text-gray-700">We craft small-batch waffles using stone-ground flour and real vanilla. Choose from classics like Belgian and Liege, or go wild with seasonal toppings. Always made to order.</p>
              <ul className="mt-4 text-gray-700 list-disc pl-5 space-y-1">
                <li>Real butter, cage-free eggs</li>
                <li>Vegan and gluten-free options</li>
                <li>Local delivery daily 10am–10pm</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className="py-10 text-center text-sm text-gray-500">© {new Date().getFullYear()} WaffleWorks. All rights reserved.</footer>
      </main>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onCheckout={checkout}
        onInc={inc}
        onDec={dec}
      />
    </div>
  )
}

export default App
