
'use client';

import Link from 'next/link';
import { useState , useMemo } from 'react';
import Data from '@/Data/productData.json'

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Display 9 items per page

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

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    return activeCategory === 'all'
      ? Data
      : Data.filter(item => item.categories && item.categories.includes(activeCategory));
  }, [activeCategory]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Get current items for the page
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.slice(startIndex, endIndex);
  }, [currentPage, filteredItems, itemsPerPage]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  };

  // Reset page to 1 when category changes
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1); // Reset to first page on category change
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://readdy.ai/api/search-image?query=elegant%20restaurant%20table%20setting%20with%20Italian%20food%2C%20multiple%20dishes%2C%20pasta%2C%20pizza%2C%20wine%20glasses%2C%20professional%20food%20photography%2C%20warm%20lighting%2C%20authentic%20Italian%20restaurant%20atmosphere&width=1920&height=600&seq=menu-hero&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-pacifico)' }}>
              Our Menu
            </h1>
            <p className="text-xl md:text-2xl text-gray-100">
              Discover authentic Italian flavors crafted with passion and tradition
            </p>
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-amber-100 hover:text-amber-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className={`${category.icon} text-sm`}></i>
                  </div>
                  {category.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-1 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-cover bg-center" style={{
                    backgroundImage: `url('${item.image}')`
                  }}></div>
                  <div className="p-6">
                    {activeCategory === 'all' && item.categories && item.categories.length > 0 && (
                      <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium mb-2 inline-block">
                        {item.categories[0]}
                      </span>
                    )}
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                      <span className="text-2xl font-bold text-amber-600">${item.price}</span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                    <a
                      href={item.link || `/menu/detail/${item.id}`}
                      className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-600 text-lg">
                No items found for this category.
              </div>
            )}
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
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Experience Our Cuisine?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Make a reservation today and let us take you on a culinary journey through Italy
          </p>
          <Link
            href="/contact"
            className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            Make a Reservation
          </Link>
        </div>
      </section>
    </div>
  );
}
