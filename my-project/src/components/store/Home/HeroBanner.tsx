import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero Banner Slides
  const heroSlides = [
    {
      id: 1,
      title: "Next-Gen Gaming PCs",
      subtitle: "Powered by Intel Core i9 & RTX 4090",
      description:
        "Experience ultimate performance with our latest gaming rigs",
      buttonText: "Shop Now",
      image:
        "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&h=400&fit=crop",
      color: "from-purple-600 to-blue-600",
    },
    {
      id: 2,
      title: "RTX 40 Series Available",
      subtitle: "The Ultimate Gaming Experience",
      description: "Get your hands on the latest graphics cards",
      buttonText: "Shop GPUs",
      image:
        "https://images.unsplash.com/photo-1591488322449-7f3c9fd4c5f5?w=800&h=400&fit=crop",
      color: "from-blue-600 to-cyan-600",
    },
    {
      id: 3,
      title: "Gaming Peripherals",
      subtitle: "Up to 40% OFF",
      description: "Keyboards, mice, headsets and more",
      buttonText: "Shop Now",
      image:
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&h=400&fit=crop",
      color: "from-red-600 to-orange-600",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  return (
    <div className="relative bg-linear-to-r from-gray-900 to-gray-800 text-white">
      <div className="relative h-125 overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 bg-linear-to-r ${slide.color} mix-blend-multiply`}
            ></div>
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-2">{slide.subtitle}</p>
                  <p className="text-gray-200 mb-8">{slide.description}</p>
                  <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
