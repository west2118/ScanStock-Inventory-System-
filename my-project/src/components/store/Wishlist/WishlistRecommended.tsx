import React from 'react';

const WishlistRecommended = ({ wishlistItems }: { wishlistItems: any[] }) => {
  if (wishlistItems.length === 0) return null;

  return (
    <div className="border-t border-gray-100 pt-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          You May Also Like
        </h2>
        <button className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          View All →
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {wishlistItems.slice(0, 4).map((item) => (
          <div key={`rec-${item.id}`} className="group cursor-pointer">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-2">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {item.brand}
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                ₱{item.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistRecommended;
