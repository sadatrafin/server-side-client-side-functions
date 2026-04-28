import Link from 'next/link'
import ProductCard from '@/components/Card'


export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string; category?: string; q?: string }> }) {

  const { page, category, q } = await searchParams
  const limit = 9
  const currentPage = Math.max(1, parseInt(page || '1', 10))
  const skip = (currentPage - 1) * limit


  const categoriesRes = await fetch('https://dummyjson.com/products/categories', { cache: 'no-store' })
  const categoriesData = await categoriesRes.json()
  const categories = Array.isArray(categoriesData) ? categoriesData.map((cat: any) => typeof cat === 'string' ? cat : cat.slug) : []


  let url = ''
  if (q) {
    url = `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`
  } else if (category && category !== 'all') {
    url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
  } else {
    url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  }

  const response = await fetch(url, { cache: 'no-store' })
  const { products, total } = await response.json()
  const totalPages = Math.ceil(total / limit)

  interface Product {
    id: number
    title: string
    description: string
    price: number
    rating: number
    thumbnail: string
    category: string
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-black mb-2">Products</h1>
          <p className="text-gray-700 text-sm md:text-base">{total} items found</p>
        </div>

        {/* Search Bar */}
        <form action="" method="get" className="mb-8 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              name="q"
              placeholder="Search products..."
              defaultValue={q || ''}
              className="flex-1 px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium cursor-pointer">
              Search
            </button>
            {(q || category) && (
              <Link href="?" className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition font-medium text-center">
                Clear
              </Link>
            )}
          </div>
        </form>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Category Sidebar */}
          <div className="w-full lg:w-40">
            <div className="flex flex-row lg:flex-col gap-2 lg:gap-3 overflow-x-auto lg:overflow-visible">
              <Link href="?" className={`px-4 py-2 rounded whitespace-nowrap text-sm transition ${!category ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                All
              </Link>
              {categories.map((cat: string) => (
                <Link
                  key={cat}
                  href={`?category=${cat}`}
                  className={`px-4 py-2 rounded whitespace-nowrap text-sm capitalize transition ${category === cat ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {products.map((product: Product) => (

                    <ProductCard key={product.id} product={product} />
                    
                  ))}
                </div>


                <div className="flex justify-center items-center gap-4 md:gap-6 mt-12 flex-wrap">
                  {currentPage > 1 ? (
                    <Link href={`?page=${currentPage - 1}${category ? `&category=${category}` : ''}${q ? `&q=${encodeURIComponent(q)}` : ''}`} className="text-gray-600 hover:text-black transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg>
                    </Link>
                  ) : (
                    <div className="w-5" />
                  )}

                  <div className="flex gap-1 md:gap-2 flex-wrap justify-center">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <Link
                        key={p}
                        href={`?page=${p}${category ? `&category=${category}` : ''}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
                        className={p === currentPage ? 'w-8 h-8 flex items-center justify-center bg-gray-200 text-black font-bold rounded-full border border-gray-400 text-sm' : 'w-8 h-8 flex items-center justify-center text-gray-700 hover:text-black transition text-sm'}
                      >
                        {p}
                      </Link>
                    ))}
                  </div>

                  {currentPage < totalPages ? (
                    <Link href={`?page=${currentPage + 1}${category ? `&category=${category}` : ''}${q ? `&q=${encodeURIComponent(q)}` : ''}`} className="text-gray-600 hover:text-black transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
                    </Link>
                  ) : (
                    <div className="w-5" />
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found. Try different search or category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


