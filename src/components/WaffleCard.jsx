export default function WaffleCard({ waffle, onAdd }) {
  return (
    <div className="group rounded-2xl border border-black/5 bg-white shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="aspect-[4/3] overflow-hidden bg-amber-50">
        {waffle.image ? (
          <img src={waffle.image} alt={waffle.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
        ) : (
          <div className="w-full h-full grid place-items-center text-amber-900">🥞</div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-gray-900 text-lg">{waffle.name}</h3>
          <span className="font-extrabold text-gray-900">${waffle.price.toFixed(2)}</span>
        </div>
        {waffle.description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{waffle.description}</p>
        )}
        <button onClick={() => onAdd(waffle)} className="mt-4 w-full bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2 rounded-lg transition">
          Add to Cart
        </button>
      </div>
    </div>
  )
}
