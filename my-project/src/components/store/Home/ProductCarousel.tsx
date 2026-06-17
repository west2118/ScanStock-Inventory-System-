import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import ProductsProductCard from "../Products/ProductsProductCard";

const ProductCarousel = ({ products }: { products: any[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    // Show arrows only if there are more than 5 products
    if (products?.length > 5) {
      setShowArrows(true);
    } else {
      setShowArrows(false);
    }
  }, [products]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="relative group">
      {/* Cards Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-none snap-start w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(20%-1.2rem)]"
          >
            <ProductsProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {showArrows && (
        <>
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 p-3 bg-white rounded-full shadow-lg border border-gray-100 hover:bg-gray-50 transition-colors z-10 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 p-3 bg-white rounded-full shadow-lg border border-gray-100 hover:bg-gray-50 transition-colors z-10 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </>
      )}
    </div>
  );
};

export default ProductCarousel;
