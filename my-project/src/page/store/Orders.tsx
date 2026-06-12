// OrdersPage.jsx
import React, { useState } from "react";
import {
  Package,
  Search,
  Filter,
  Eye,
  Truck,
  PackageCheck,
  Clock,
  XCircle,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Calendar,
  Download,
  Printer,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  CreditCard,
  Wallet,
  Building2,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Star,
  MessageCircle,
  FileText,
  Receipt,
} from "lucide-react";
import OrdersTab from "../../components/store/Orders/OrdersTab";
import OrdersList from "../../components/store/Orders/OrdersList";
import OrdersHeader from "../../components/store/Orders/OrdersHeader";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/utils";
import type { OrderType } from "../../types/order.types";
import type { PaginationType } from "../../utils/types";

type OrderData = {
  orders: OrderType[];
  pagination: PaginationType;
};

const OrdersPage = () => {
  const { data, isLoading } = useQuery<OrderData>({
    queryKey: ["orders-data"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/orders`),
  });

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  console.log("Orders: ", data);

  // Orders Data
  const orders = [
    {
      id: "ORD-2024-001234",
      date: "2024-01-15",
      time: "10:30 AM",
      status: "to_pay",
      paymentMethod: "GCash",
      total: 124995,
      items: [
        {
          id: 1,
          name: "ASUS ROG Strix RTX 4090",
          quantity: 1,
          price: 124995,
          image:
            "https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=100&h=100&fit=crop",
          brand: "ASUS",
        },
      ],
      shippingAddress: {
        name: "John Reyes",
        address: "123 Tech Avenue, Makati City",
        city: "Makati",
        province: "Metro Manila",
        zipCode: "1234",
        phone: "0912 345 6789",
      },
      trackingNumber: null,
      expectedDelivery: null,
    },
    {
      id: "ORD-2024-001235",
      date: "2024-01-14",
      time: "02:15 PM",
      status: "to_ship",
      paymentMethod: "Credit Card",
      total: 89995,
      items: [
        {
          id: 2,
          name: "ASUS ROG Zephyrus G14",
          quantity: 1,
          price: 89995,
          image:
            "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=100&h=100&fit=crop",
          brand: "ASUS",
        },
      ],
      shippingAddress: {
        name: "Maria Santos",
        address: "456 Digital Hub, Quezon City",
        city: "Quezon City",
        province: "Metro Manila",
        zipCode: "1100",
        phone: "0917 123 4567",
      },
      trackingNumber: "TRK-2S7H9J3K",
      expectedDelivery: "2024-01-18",
    },
    {
      id: "ORD-2024-001236",
      date: "2024-01-13",
      time: "09:45 AM",
      status: "to_receive",
      paymentMethod: "Cash on Delivery",
      total: 32995,
      items: [
        {
          id: 3,
          name: "Intel Core i9-13900K",
          quantity: 1,
          price: 32995,
          image:
            "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=100&h=100&fit=crop",
          brand: "Intel",
        },
      ],
      shippingAddress: {
        name: "Mike Chen",
        address: "789 IT Park, Cebu City",
        city: "Cebu City",
        province: "Cebu",
        zipCode: "6000",
        phone: "0922 987 6543",
      },
      trackingNumber: "TRK-4W9E2R6T",
      expectedDelivery: "2024-01-17",
    },
    {
      id: "ORD-2024-001237",
      date: "2024-01-12",
      time: "04:30 PM",
      status: "completed",
      paymentMethod: "Credit Card",
      total: 12995,
      items: [
        {
          id: 4,
          name: "Samsung 990 Pro 2TB",
          quantity: 1,
          price: 12995,
          image:
            "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=100&h=100&fit=crop",
          brand: "Samsung",
        },
      ],
      shippingAddress: {
        name: "Anna Santos",
        address: "321 Cyber Zone, Davao City",
        city: "Davao City",
        province: "Davao del Sur",
        zipCode: "8000",
        phone: "0933 456 7890",
      },
      trackingNumber: "TRK-8A1S4D9F",
      expectedDelivery: "2024-01-15",
      deliveredDate: "2024-01-15",
    },
    {
      id: "ORD-2024-001238",
      date: "2024-01-11",
      time: "11:00 AM",
      status: "return_refund",
      paymentMethod: "GCash",
      total: 8995,
      items: [
        {
          id: 5,
          name: "Corsair Vengeance 32GB",
          quantity: 1,
          price: 8995,
          image:
            "https://images.unsplash.com/photo-1562976540-1502c2145186?w=100&h=100&fit=crop",
          brand: "Corsair",
        },
      ],
      shippingAddress: {
        name: "Robert Diaz",
        address: "555 Gaming Ave, Pasig City",
        city: "Pasig",
        province: "Metro Manila",
        zipCode: "1600",
        phone: "0944 567 8901",
      },
      trackingNumber: "TRK-1Q3W5E7R",
      returnReason: "Defective product - not working as expected",
      returnStatus: "pending_review",
    },
    {
      id: "ORD-2024-001239",
      date: "2024-01-10",
      time: "01:20 PM",
      status: "cancelled",
      paymentMethod: "Credit Card",
      total: 15995,
      items: [
        {
          id: 6,
          name: "MSI MPG B650 Carbon WiFi",
          quantity: 1,
          price: 15995,
          image:
            "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=100&h=100&fit=crop",
          brand: "MSI",
        },
      ],
      shippingAddress: {
        name: "Lisa Garcia",
        address: "888 Tech Park, Taguig City",
        city: "Taguig",
        province: "Metro Manila",
        zipCode: "1630",
        phone: "0955 678 9012",
      },
      cancellationReason: "Ordered by mistake",
      cancelledDate: "2024-01-10",
    },
    {
      id: "ORD-2024-001240",
      date: "2024-01-09",
      time: "03:45 PM",
      status: "to_pay",
      paymentMethod: "Cash on Delivery",
      total: 5495,
      items: [
        {
          id: 7,
          name: "Logitech G502 X Plus",
          quantity: 1,
          price: 5495,
          image:
            "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=100&h=100&fit=crop",
          brand: "Logitech",
        },
      ],
      shippingAddress: {
        name: "James Wilson",
        address: "123 RGB Lane, Mandaluyong City",
        city: "Mandaluyong",
        province: "Metro Manila",
        zipCode: "1550",
        phone: "0966 789 0123",
      },
      trackingNumber: null,
      expectedDelivery: null,
    },
    {
      id: "ORD-2024-001241",
      date: "2024-01-08",
      time: "08:30 AM",
      status: "to_ship",
      paymentMethod: "Credit Card",
      total: 24995,
      items: [
        {
          id: 8,
          name: 'LG UltraGear 27" 240Hz',
          quantity: 1,
          price: 24995,
          image:
            "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100&h=100&fit=crop",
          brand: "LG",
        },
      ],
      shippingAddress: {
        name: "Sarah Lim",
        address: "456 Gaming Street, BGC Taguig",
        city: "Taguig",
        province: "Metro Manila",
        zipCode: "1630",
        phone: "0977 890 1234",
      },
      trackingNumber: "TRK-5H6J8K9L",
      expectedDelivery: "2024-01-12",
    },
  ];

  // Tab configuration
  const tabs = [
    { id: "all", label: "All", icon: Package, count: orders.length },
    {
      id: "to_pay",
      label: "To Pay",
      icon: CreditCard,
      count: orders.filter((o) => o.status === "to_pay").length,
    },
    {
      id: "to_ship",
      label: "To Ship",
      icon: Package,
      count: orders.filter((o) => o.status === "to_ship").length,
    },
    {
      id: "to_receive",
      label: "To Receive",
      icon: Truck,
      count: orders.filter((o) => o.status === "to_receive").length,
    },
    {
      id: "completed",
      label: "Completed",
      icon: CheckCircle,
      count: orders.filter((o) => o.status === "completed").length,
    },
    {
      id: "return_refund",
      label: "Return/Refund",
      icon: RotateCcw,
      count: orders.filter((o) => o.status === "return_refund").length,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      icon: XCircle,
      count: orders.filter((o) => o.status === "cancelled").length,
    },
  ];

  // Filter orders based on active tab and search
  const filteredOrders = orders
    .filter((order) => activeTab === "all" || order.status === activeTab)
    .filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    );

  const getStatusBadge = (status) => {
    switch (status) {
      case "to_pay":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          icon: <Clock size={14} />,
          label: "Waiting for Payment",
        };
      case "to_ship":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          icon: <Package size={14} />,
          label: "Preparing to Ship",
        };
      case "to_receive":
        return {
          bg: "bg-purple-100",
          text: "text-purple-700",
          icon: <Truck size={14} />,
          label: "Out for Delivery",
        };
      case "completed":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          icon: <CheckCircle size={14} />,
          label: "Delivered",
        };
      case "return_refund":
        return {
          bg: "bg-orange-100",
          text: "text-orange-700",
          icon: <RotateCcw size={14} />,
          label: "Return Requested",
        };
      case "cancelled":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          icon: <XCircle size={14} />,
          label: "Cancelled",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          icon: <Package size={14} />,
          label: status,
        };
    }
  };

  const getActionButtons = (order) => {
    switch (order.status) {
      case "to_pay":
        return (
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
              Pay Now
            </button>
            <button
              onClick={() => {
                setSelectedOrder(order);
                setShowCancelModal(true);
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel Order
            </button>
          </div>
        );
      case "to_ship":
        return (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSelectedOrder(order);
                setShowCancelModal(true);
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel Order
            </button>
          </div>
        );
      case "to_receive":
        return (
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
              Confirm Receipt
            </button>
            <button
              onClick={() => {
                setSelectedOrder(order);
                setShowReturnModal(true);
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Request Return
            </button>
          </div>
        );
      case "completed":
        return (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setSelectedOrder(order);
                setShowReviewModal(true);
              }}
              className="px-4 py-2 border border-yellow-400 text-yellow-600 rounded-lg text-sm hover:bg-yellow-50 transition-colors flex items-center gap-1"
            >
              <Star size={14} />
              Write Review
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              Buy Again
            </button>
          </div>
        );
      case "return_refund":
        return (
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700 transition-colors">
              Track Return
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <OrdersHeader />

        {/* Tabs */}
        <OrdersTab
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Orders List */}
        <OrdersList
          orders={data?.orders ?? []}
          getStatusBadge={getStatusBadge}
        />
      </div>

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Order Details
                </h3>
                <p className="text-sm text-gray-500 font-mono">
                  {selectedOrder.id}
                </p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <XCircle size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {/* Order Status Timeline */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Order Placed</p>
                    <p className="text-xs text-gray-400">
                      {selectedOrder.date}
                    </p>
                  </div>
                  <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>
                  <div className="text-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                        selectedOrder.status !== "cancelled"
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >
                      {selectedOrder.status !== "cancelled" ? (
                        <CheckCircle size={16} className="text-white" />
                      ) : (
                        <XCircle size={16} className="text-white" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Processing</p>
                  </div>
                  <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                  <div className="text-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                        selectedOrder.status === "to_receive" ||
                        selectedOrder.status === "completed"
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >
                      <Truck size={16} className="text-white" />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Shipped</p>
                  </div>
                  <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
                  <div className="text-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                        selectedOrder.status === "completed"
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >
                      <PackageCheck size={16} className="text-white" />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Delivered</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 py-3 border-b border-gray-100"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.brand}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Information */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin size={16} />
                  Shipping Information
                </h4>
                <p className="text-sm text-gray-700">
                  {selectedOrder.shippingAddress.name}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedOrder.shippingAddress.address}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedOrder.shippingAddress.city},{" "}
                  {selectedOrder.shippingAddress.province}{" "}
                  {selectedOrder.shippingAddress.zipCode}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  📞 {selectedOrder.shippingAddress.phone}
                </p>

                {selectedOrder.trackingNumber && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-500">Tracking Number</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedOrder.trackingNumber}
                    </p>
                    {selectedOrder.expectedDelivery && (
                      <p className="text-sm text-gray-600 mt-1">
                        Expected Delivery: {selectedOrder.expectedDelivery}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(selectedOrder.total)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t border-gray-100">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">
                      {formatCurrency(selectedOrder.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {selectedOrder.status === "to_pay" ? "Pay Now" : "Track Order"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Order Modal */}
      {showCancelModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Cancel Order
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Are you sure you want to cancel this order?
              </p>
            </div>
            <div className="p-6">
              <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      Order will be cancelled
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Order ID: {selectedOrder.id}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for cancellation
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                  <option>Ordered by mistake</option>
                  <option>Found a better price elsewhere</option>
                  <option>Changed my mind</option>
                  <option>Shipping takes too long</option>
                  <option>Other reason</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Return/Refund Modal */}
      {showReturnModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Request Return/Refund
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Tell us why you want to return this order
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Return Reason
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                  <option>Defective product</option>
                  <option>Wrong item received</option>
                  <option>Damaged during shipping</option>
                  <option>Not as described</option>
                  <option>Other reason</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Comments
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Please provide more details..."
                ></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setShowReturnModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowReturnModal(false)}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Write Review Modal */}
      {showReviewModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Write a Review
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Share your experience with {selectedOrder.items[0].name}
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="p-1">
                      <Star
                        size={24}
                        className="text-gray-300 hover:text-yellow-400 transition-colors"
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Review Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="e.g., Great product!"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Review
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Share your experience with this product..."
                ></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setShowReviewModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowReviewModal(false)}
                className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
