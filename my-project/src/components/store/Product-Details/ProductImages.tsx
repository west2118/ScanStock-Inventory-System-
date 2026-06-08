import { useState } from "react";
import type { ProductImageType } from "../../../utils/types";

const ProductImages = ({
  productImages,
}: {
  productImages: ProductImageType[];
}) => {
  const mainPhoto = productImages.find((p) => p.isPrimary) || productImages[0];

  const [selectedImage, setSelectedImage] = useState(mainPhoto);

  if (!selectedImage) return null;

  return (
    <div>
      {/* Main Image */}
      <div className="bg-white rounded-2xl overflow-hidden mb-4 border border-gray-200">
        <img
          src={selectedImage.imageUrl}
          className="w-full h-100 object-cover"
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-3">
        {productImages.map((img) => (
          <button
            key={img.id}
            onClick={() => setSelectedImage(img)}
            className={`border-2 rounded-xl overflow-hidden transition-all ${
              selectedImage.id === img.id
                ? "border-blue-600"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <img src={img.imageUrl} className="w-full h-24 object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
