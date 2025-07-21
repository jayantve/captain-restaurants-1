'use client';

import Data from '@/Data/productData.json'
import Link from 'next/link';
import { IoCloseCircle } from "react-icons/io5";
import { useState, useEffect ,useMemo } from 'react';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const categories = [
    { id: 'all', name: 'All Items', icon: 'ri-restaurant-line' },
    { id: 'Veg', name: 'Vegetarian', icon: 'ri-bowl-line' },
    { id: 'Non-Veg', name: 'Non-Vegetarian', icon: 'ri-restaurant-2-line' },
    { id: 'Indian', name: 'Indian', icon: 'ri-cake-line' },
    { id: 'Mexican', name: 'Mexican', icon: 'ri-goblet-line' },
    { id: 'Chinese', name: 'Chinese', icon: 'ri-cake-2-line' },
    { id: 'Main Course', name: 'Main Course', icon: 'ri-restaurant-line' },
    { id: 'Rice', name: 'Rice', icon: 'ri-restaurant-line' },
    { id: 'Noodles', name: 'Noodles', icon: 'ri-goblet-line' }
  ];

  const filteredAndSearchedItems = useMemo(() => {
    return Data.filter(item => {
      const matchesCategory = selectedCategory === 'all' || (item.categories && item.categories.includes(selectedCategory));
      const matchesQuery =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredAndSearchedItems.length / itemsPerPage);

  // Get items for the current page
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSearchedItems.slice(startIndex, endIndex);
  }, [currentPage, filteredAndSearchedItems, itemsPerPage]);

  useEffect(() => {
    // Simulate search delay, but only when query or category changes
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Small delay for loading indicator

    return () => clearTimeout(timer); // Cleanup timeout
  }, [searchQuery, selectedCategory]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page on category change
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1); // Reset page on clear
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section 
        className="relative h-80 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://readdy.ai/api/search-image?query=restaurant%20kitchen%20with%20chef%20preparing%20multiple%20dishes%2C%20search%20concept%2C%20professional%20food%20photography%2C%20warm%20lighting%2C%20Italian%20restaurant%20atmosphere%2C%20cooking%20process&width=1920&height=500&seq=search-hero&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-pacifico)' }}>
              Search Our Menu
            </h1>
            <p className="text-xl text-gray-100">
              Find your perfect dish from our authentic Italian collection
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-6 text-md text-orange-600/90 font-semibold ">
              <div className="w-5 h-5 flex items-center justify-center absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className="ri-search-line"></i>
              </div>
              <input
                type="text"
                placeholder="Search for dishes, ingredients, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-900 hover:text-orange-900 cursor-pointer"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <IoCloseCircle className='text-xl text-orange-500' />
                  </div>
                </button>
              )}
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-amber-100 hover:text-amber-800'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Searching our menu...</p>
            </div>
          ) : filteredAndSearchedItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-gray-100 rounded-full">
                <i className="ri-search-line text-2xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any dishes matching "{searchQuery}". Try different keywords or browse our categories.
              </p>
              <a
                href="/menu"
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                View Full Menu
              </a>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Search Results
                </h2>
                <p className="text-gray-600">
                  Found {filteredAndSearchedItems.length} {filteredAndSearchedItems.length === 1 ? 'dish' : 'dishes'}
                  {searchQuery && ` for "${searchQuery}"`}
                  {selectedCategory !== 'all' && ` in ${categories.find(cat => cat.id === selectedCategory)?.name}`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="h-48 bg-cover bg-center" style={{
                      backgroundImage: `url('${item.image}')`
                    }}></div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        {item.categories && item.categories.length > 0 && (
                          <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                            {item.categories[0]}
                          </span>
                        )}
                        <span className="text-2xl font-bold text-amber-600">${item.price}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                      <a
                        href={item.link || `/menu/detail/${item.id}`}
                        className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-full bg-amber-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 rounded-full ${
                        currentPage === index + 1
                          ? 'bg-amber-800 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-amber-100'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-full bg-amber-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Found Something You Love?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Make a reservation today and experience authentic Indian and Chinese cuisine
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              Make a Reservation
            </a>
            <a
              href="/menu"
              className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 rounded-full text-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              View Full Menu
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}