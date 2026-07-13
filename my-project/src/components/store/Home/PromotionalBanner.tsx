import { Award, Zap } from "lucide-react";
const PromotionalBanner = () => {
  // Promotional Banners
  const promoBanners = [
    {
      title: "Build Your Dream PC",
      subtitle: "Free assembly with purchase of complete system",
      buttonText: "Customize Now",
      color: "from-blue-600 to-purple-600",
      icon: <Zap className="w-12 h-12" />,
    },
    {
      title: "Student Discount",
      subtitle: "10% OFF on all components with valid ID",
      buttonText: "Shop Now",
      color: "from-green-600 to-teal-600",
      icon: <Award className="w-12 h-12" />,
    },
  ];

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`bg-gradient-to-r ${promoBanners[0].color} rounded-2xl p-8 text-white`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {promoBanners[0].icon}
              <div>
                <h3 className="text-2xl font-bold">{promoBanners[0].title}</h3>
                <p className="text-white/90">{promoBanners[0].subtitle}</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {promoBanners[0].buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;
