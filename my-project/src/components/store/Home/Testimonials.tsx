import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Reyes",
      role: "Professional Gamer",
      rating: 5,
      text: "Best computer parts store in the Philippines! Got my RTX 4090 at a great price. Customer service is top notch!",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Maria Santos",
      role: "Content Creator",
      rating: 5,
      text: "Fast delivery and genuine products. Built my entire editing rig from ByteForge. Highly recommended!",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Mike Chen",
      role: "IT Professional",
      rating: 5,
      text: "Great selection of components and knowledgeable staff. Will definitely buy again.",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];


  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="text-gray-500 mt-1">
            Join thousands of satisfied builders
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
