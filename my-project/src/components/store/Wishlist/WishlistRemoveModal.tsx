import React from 'react';
import Modal from '../../Admin/UI/Modal';

const WishlistRemoveModal = ({ 
  show, 
  itemToRemove, 
  onCancel, 
  onConfirm 
}: {
  show: boolean;
  itemToRemove: any;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  if (!show || !itemToRemove) return null;

  return (
    <Modal 
      isModalOpen={show} 
      isCloseModal={onCancel} 
      title="Remove item?"
      width="max-w-sm"
    >
      <p className="text-sm text-gray-500 mb-6">
        Remove{" "}
        <span className="font-medium text-gray-900">
          {itemToRemove.name}
        </span>{" "}
        from your wishlist?
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
        >
          Remove
        </button>
      </div>
    </Modal>
  );
};

export default WishlistRemoveModal;
