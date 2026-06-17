import React from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WishlistEmptyState = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
      <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <Heart className="w-10 h-10 text-pink-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Your wishlist is empty
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Save your favorite items here
      </p>
      <button 
        onClick={() => navigate('/products')}
        className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
      >
        Start Shopping
      </button>
    </div>
  );
};

export default WishlistEmptyState;
