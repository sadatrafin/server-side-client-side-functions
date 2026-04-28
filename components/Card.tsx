interface Product {
  id: number
  title: string
  description: string
  price: number
  rating: number
  thumbnail: string
  category: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow hover:shadow-lg transition">
      {/* Product Image */}
      <div className="relative bg-gray-100 aspect-square overflow-hidden rounded-t-lg">
        <img src={product.thumbnail} alt={product.title} className="w-full h-full object-contain p-3" />
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-semibold text-gray-700 uppercase">
          {product.category}
        </div>
      </div>

      <div className="flex flex-col grow p-4">
        <h2 className="font-semibold text-gray-900 line-clamp-2 mb-2 text-sm md:text-base">{product.title}</h2>
        <p className="text-gray-600 line-clamp-2 mb-4 text-xs md:text-sm">{product.description}</p>

        {/* Price & Rating */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg md:text-xl font-bold text-gray-900">${product.price}</span>
          <div className="flex items-center gap-1 text-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>
            <span className="text-xs md:text-sm font-medium">{product.rating}</span>
          </div>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition font-medium text-sm">
          View
        </button>
      </div>
    </div>
  )
}
