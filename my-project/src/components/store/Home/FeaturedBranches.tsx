import { Clock, MapPin, Phone } from "lucide-react";

const FeaturedBranches = ({ branches }: { branches: any }) => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Branch Availability
          </h2>
          <p className="text-gray-500 mt-1">Visit our stores nationwide</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {branches.map((branch) => (
            <div
              key={branch.location}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {branch.location}
                  </h3>
                  <p className="text-sm text-gray-500">{branch.address}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{branch.hours}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{branch.phone}</span>
                </div>
              </div>
              <button className="mt-4 w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                View Products
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBranches;
