import { Heart, Minus, Plus, Share2, ShoppingCart } from "lucide-react";
import React from "react";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import type { ProductDetailsType } from "../../../utils/types";

const ProductDisplay = ({ product }: { product: ProductDetailsType }) => {
  console.log(product);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      {/* Left Column - Product Image */}
      <ProductImages productImages={product?.images} />

      {/* Right Column - Product Info */}
      <ProductInfo product={product} />
    </div>
  );
};

export default ProductDisplay;
