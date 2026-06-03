import { Cpu, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-linear-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <span className="text-xl font-bold">EasyPC</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your one-stop shop for premium computer parts and gaming gear in
              the Philippines.
            </p>
            {/* <div className="flex gap-4 mt-4">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div> */}
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Graphics Cards
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Processors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Motherboards
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Gaming Peripherals
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(02) 8123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@easypc.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 EasyPC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
