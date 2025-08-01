'use client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import productdata from '@/Data/productData.json'

export default async function Page({ params }) {
    const { slug } = await params
    return (
        <>
            <MenuItemDetail itemId={slug} />
        </>
    )
}



function MenuItemDetail({ itemId }) {
  

  const item = productdata[itemId];
  
  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link 
              href="/menu" 
              className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium cursor-pointer"
            >
              <div className="w-4 h-4 flex items-center justify-center mr-2">
                <i className="ri-arrow-left-line"></i>
              </div>
              Back to Menu
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {item.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {item.name}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {item.description}
              </p>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-bold text-amber-600">
                  ${item.price}
                </span>
                <div className="flex items-center text-gray-500">
                  <div className="w-5 h-5 flex items-center justify-center mr-2">
                    <i className="ri-time-line"></i>
                  </div>
                  <span>{item.preparationTime}</span>
                </div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  <div className="flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center mr-2">
                      <i className="ri-chef-hat-line text-amber-600"></i>
                    </div>
                    Chef's Note
                  </div>
                </h3>
                <p className="text-gray-700 italic">
                  {item.chef_note}
                </p>
              </div>
            </div>
            
            <div className="h-96 lg:h-[500px] bg-cover bg-center rounded-lg shadow-lg" style={{
              backgroundImage: `url('${item.image}')`
            }}></div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Dish</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {item.details}
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h3>
                <ul className="space-y-2">
                  {item.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Allergen Information</h3>
                <div className="flex flex-wrap gap-2">
                  {item.allergens.map((allergen, index) => (
                    <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Try This Dish?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Make a reservation today and experience the authentic flavors of Italy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              Make a Reservation
            </Link>
            <Link 
              href="/menu"
              className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 rounded-full text-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
