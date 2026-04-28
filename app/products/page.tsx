'use client'

import { useState, useEffect, useMemo } from 'react'
import ProductCard from '@/components/Card'

interface Product {
  id: number
  title: string
  description: string
  price: number
  rating: number
  thumbnail: string
  category: string
}

export default function Page() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const limit = 9

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://dummyjson.com/products', { cache: 'no-store' })
        const data = await response.json()
        setAllProducts(data.products || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const categories = useMemo(() => {
    const unique = Array.from(new Set(allProducts.map((p) => p.category)))
    return unique.sort()
  }, [allProducts])

  const filteredProducts = useMemo(() => {
    let filtered = allProducts

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    const query = searchQuery.toLowerCase().trim()
    if (query) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [allProducts, searchQuery, selectedCategory])

  const totalPages = Math.ceil(filteredProducts.length / limit)
  const skip = (currentPage - 1) * limit
  const paginatedProducts = filteredProducts.slice(skip, skip + limit)

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleClear = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-black mb-2">Products</h1>
          {!loading && (
            <p className="text-gray-700 text-sm md:text-base">
              {paginatedProducts.length > 0 ? `${filteredProducts.length} products found` : 'No products found'}
            </p>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="button"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium cursor-pointer"
            >
              Search
            </button>
            {(searchQuery || selectedCategory) && (
              <button
                onClick={handleClear}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition font-medium cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-row gap-2 overflow-x-auto">
            <button
              onClick={() => {
                setSelectedCategory('')
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded whitespace-nowrap text-sm transition ${
                !selectedCategory ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat)
                  setCurrentPage(1)
                }}
                className={`px-4 py-2 rounded whitespace-nowrap text-sm capitalize transition ${
                  selectedCategory === cat ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">Error: {error}</p>
          </div>
        ) : paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 md:gap-6 flex-wrap">
              {currentPage > 1 ? (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="text-gray-600 hover:text-black transition cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              ) : (
                <div className="w-5" />
              )}

              <div className="flex gap-1 md:gap-2 flex-wrap justify-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={
                      page === currentPage
                        ? 'w-8 h-8 flex items-center justify-center bg-gray-200 text-black font-bold rounded-full border border-gray-400 text-sm cursor-pointer'
                        : 'w-8 h-8 flex items-center justify-center text-gray-700 hover:text-black transition text-sm cursor-pointer'
                    }
                  >
                    {page}
                  </button>
                ))}
              </div>

              {currentPage < totalPages ? (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="text-gray-600 hover:text-black transition cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
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
  )
}