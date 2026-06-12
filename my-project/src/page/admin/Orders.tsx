// AdminOrdersPage.jsx - Admin Orders Management
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
  User,
  Edit,
  Save,
  X,
  DollarSign,
  FileText,
  MessageSquare,
  Send,
  MoreVertical,
} from "lucide-react";

const AdminOrdersPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
  const [showEditShippingModal, setShowEditShippingModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statusNote, setStatusNote] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Orders Data for Admin
  const [orders, setOrders] = useState([
    {
      id: "ORD-2024-001234",
      date: "2024-01-15",
      time: "10:30 AM",
      status: "pending",
      paymentMethod: "GCash",
      paymentStatus: "paid",
      subtotal: 124995,
      shippingFee: 0,
      total: 124995,
      customer: {
        name: "John Reyes",
        email: "john.reyes@email.com",
        phone: "0912 345 6789",
      },
      shippingAddress: {
        name: "John Reyes",
        address: "123 Tech Avenue, Makati City",
        city: "Makati",
        province: "Metro Manila",
        zipCode: "1234",
        phone: "0912 345 6789",
      },
      items: [
        {
          id: 1,
          name: "ASUS ROG Strix RTX 4090",
          quantity: 1,
          price: 124995,
          image:
            "https://images.unsplash.com/photo-1591488322449-7f9c3fd4c5f5?w=100&h=100&fit=crop",
          brand: "ASUS",
          sku: "RTX4090-OC-24G",
        },
      ],
      trackingNumber: null,
      carrier: null,
      notes: "",
      updatedAt: "2024-01-15 10:30 AM",
    },
    {
      id: "ORD-2024-001235",
      date: "2024-01-14",
      time: "02:15 PM",
      status: "processing",
      paymentMethod: "Credit Card",
      paymentStatus: "paid",
      subtotal: 89995,
      shippingFee: 0,
      total: 89995,
      customer: {
        name: "Maria Santos",
        email: "maria.santos@email.com",
        phone: "0917 123 4567",
      },
      shippingAddress: {
        name: "Maria Santos",
        address: "456 Digital Hub, Quezon City",
        city: "Quezon City",
        province: "Metro Manila",
        zipCode: "1100",
        phone: "0917 123 4567",
      },
      items: [
        {
          id: 2,
          name: "ASUS ROG Zephyrus G14",
          quantity: 1,
          price: 89995,
          image:
            "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=100&h=100&fit=crop",
          brand: "ASUS",
          sku: "GA402RJ-G14",
        },
      ],
      trackingNumber: "TRK-2S7H9J3K",
      carrier: "LBC Express",
      notes: "Customer requested gift wrapping",
      updatedAt: "2024-01-14 03:30 PM",
    },
    {
      id: "ORD-2024-001236",
      date: "2024-01-13",
      time: "09:45 AM",
      status: "shipped",
      paymentMethod: "Cash on Delivery",
      paymentStatus: "pending",
      subtotal: 32995,
      shippingFee: 150,
      total: 33145,
      customer: {
        name: "Mike Chen",
        email: "mike.chen@email.com",
        phone: "0922 987 6543",
      },
      shippingAddress: {
        name: "Mike Chen",
        address: "789 IT Park, Cebu City",
        city: "Cebu City",
        province: "Cebu",
        zipCode: "6000",
        phone: "0922 987 6543",
      },
      items: [
        {
          id: 3,
          name: "Intel Core i9-13900K",
          quantity: 1,
          price: 32995,
          image:
            "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=100&h=100&fit=crop",
          brand: "Intel",
          sku: "BX8071513900K",
        },
      ],
      trackingNumber: "TRK-4W9E2R6T",
      carrier: "2GO Express",
      notes: "",
      updatedAt: "2024-01-13 02:00 PM",
    },
    {
      id: "ORD-2024-001237",
      date: "2024-01-12",
      time: "04:30 PM",
      status: "delivered",
      paymentMethod: "Credit Card",
      paymentStatus: "paid",
      subtotal: 12995,
      shippingFee: 0,
      total: 12995,
      customer: {
        name: "Anna Santos",
        email: "anna.santos@email.com",
        phone: "0933 456 7890",
      },
      shippingAddress: {
        name: "Anna Santos",
        address: "321 Cyber Zone, Davao City",
        city: "Davao City",
        province: "Davao del Sur",
        zipCode: "8000",
        phone: "0933 456 7890",
      },
      items: [
        {
          id: 4,
          name: "Samsung 990 Pro 2TB",
          quantity: 1,
          price: 12995,
          image:
            "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=100&h=100&fit=crop",
          brand: "Samsung",
          sku: "MZ-V9P2T0BW",
        },
      ],
      trackingNumber: "TRK-8A1S4D9F",
      carrier: "J&T Express",
      notes: "Left at doorstep",
      updatedAt: "2024-01-15 09:00 AM",
    },
    {
      id: "ORD-2024-001238",
      date: "2024-01-11",
      time: "11:00 AM",
      status: "returned",
      paymentMethod: "GCash",
      paymentStatus: "refunded",
      subtotal: 8995,
      shippingFee: 0,
      total: 8995,
      customer: {
        name: "Robert Diaz",
        email: "robert.diaz@email.com",
        phone: "0944 567 8901",
      },
      shippingAddress: {
        name: "Robert Diaz",
        address: "555 Gaming Ave, Pasig City",
        city: "Pasig",
        province: "Metro Manila",
        zipCode: "1600",
        phone: "0944 567 8901",
      },
      items: [
        {
          id: 5,
          name: "Corsair Vengeance 32GB",
          quantity: 1,
          price: 8995,
          image:
            "https://images.unsplash.com/photo-1562976540-1502c2145186?w=100&h=100&fit=crop",
          brand: "Corsair",
          sku: "CMK32GX5M2B6000C30",
        },
      ],
      returnReason: "Defective product",
      returnStatus: "approved",
      updatedAt: "2024-01-14 10:00 AM",
    },
    {
      id: "ORD-2024-001239",
      date: "2024-01-10",
      time: "01:20 PM",
      status: "cancelled",
      paymentMethod: "Credit Card",
      paymentStatus: "refunded",
      subtotal: 15995,
      shippingFee: 0,
      total: 15995,
      customer: {
        name: "Lisa Garcia",
        email: "lisa.garcia@email.com",
        phone: "0955 678 9012",
      },
      shippingAddress: {
        name: "Lisa Garcia",
        address: "888 Tech Park, Taguig City",
        city: "Taguig",
        province: "Metro Manila",
        zipCode: "1630",
        phone: "0955 678 9012",
      },
      items: [
        {
          id: 6,
          name: "MSI MPG B650 Carbon WiFi",
          quantity: 1,
          price: 15995,
          image:
            "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=100&h=100&fit=crop",
          brand: "MSI",
          sku: "MPG B650 CARBON WIFI",
        },
      ],
      cancellationReason: "Customer request - ordered by mistake",
      updatedAt: "2024-01-10 02:00 PM",
    },
  ]);

  // Tab configuration for admin
  const tabs = [
    { id: "all", label: "All Orders", icon: Package, count: orders.length },
    {
      id: "pending",
      label: "Pending",
      icon: Clock,
      count: orders.filter((o) => o.status === "pending").length,
    },
    {
      id: "processing",
      label: "Processing",
      icon: RefreshCw,
      count: orders.filter((o) => o.status === "processing").length,
    },
    {
      id: "shipped",
      label: "Shipped",
      icon: Truck,
      count: orders.filter((o) => o.status === "shipped").length,
    },
    {
      id: "delivered",
      label: "Delivered",
      icon: CheckCircle,
      count: orders.filter((o) => o.status === "delivered").length,
    },
    {
      id: "returned",
      label: "Returned",
      icon: RotateCcw,
      count: orders.filter((o) => o.status === "returned").length,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      icon: XCircle,
      count: orders.filter((o) => o.status === "cancelled").length,
    },
  ];

  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      value: "processing",
      label: "Processing",
      color: "bg-blue-100 text-blue-700",
    },
    {
      value: "shipped",
      label: "Shipped",
      color: "bg-purple-100 text-purple-700",
    },
    {
      value: "delivered",
      label: "Delivered",
      color: "bg-green-100 text-green-700",
    },
    {
      value: "returned",
      label: "Returned",
      color: "bg-orange-100 text-orange-700",
    },
    {
      value: "cancelled",
      label: "Cancelled",
      color: "bg-red-100 text-red-700",
    },
  ];

  // Filter orders
  const filteredOrders = orders
    .filter((order) => activeTab === "all" || order.status === activeTab)
    .filter(
      (order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    );

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((order) => order.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
      setSelectAll(false);
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
      if (selectedOrders.length + 1 === filteredOrders.length) {
        setSelectAll(true);
      }
    }
  };

  const updateOrderStatus = (orderId, newStatus, note) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              notes: note || order.notes,
              updatedAt: new Date().toLocaleString(),
            }
          : order,
      ),
    );
  };

  const getStatusBadge = (status) => {
    const option = statusOptions.find((opt) => opt.value === status);
    return option || { color: "bg-gray-100 text-gray-700", label: status };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "refunded":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Order Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              View and manage all customer orders
            </p>
          </div>
          <div className="flex gap-3">
            {selectedOrders.length > 0 && (
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Truck size={16} />
                Bulk Update ({selectedOrders.length})
              </button>
            )}
            <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Printer className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-1">
            <Package size={16} className="text-blue-500" />
            <span className="text-xs text-gray-400">Total</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-1">
            <Clock size={16} className="text-yellow-500" />
            <span className="text-xs text-gray-400">Pending</span>
          </div>
          <p className="text-xl font-bold text-yellow-600">
            {orders.filter((o) => o.status === "pending").length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-1">
            <RefreshCw size={16} className="text-blue-500" />
            <span className="text-xs text-gray-400">Processing</span>
          </div>
          <p className="text-xl font-bold text-blue-600">
            {orders.filter((o) => o.status === "processing").length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-1">
            <Truck size={16} className="text-purple-500" />
            <span className="text-xs text-gray-400">Shipped</span>
          </div>
          <p className="text-xl font-bold text-purple-600">
            {orders.filter((o) => o.status === "shipped").length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-1">
            <CheckCircle size={16} className="text-green-500" />
            <span className="text-xs text-gray-400">Delivered</span>
          </div>
          <p className="text-xl font-bold text-green-600">
            {orders.filter((o) => o.status === "delivered").length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-1">
            <DollarSign size={16} className="text-green-500" />
            <span className="text-xs text-gray-400">Revenue</span>
          </div>
          <p className="text-xl font-bold text-gray-900">
            {formatCurrency(orders.reduce((sum, o) => sum + o.total, 0))}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID, customer, or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-100 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer">
                <option>All Payment Methods</option>
                <option>Credit Card</option>
                <option>GCash</option>
                <option>Cash on Delivery</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select className="bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
              </select>
            </div>
          </div>
          <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
            <RefreshCw className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                <span
                  className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-8 py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Order ID / Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Customer
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Products
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Total
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Payment
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => {
                const statusBadge = getStatusBadge(order.status);
                return (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-mono text-sm font-medium text-gray-900">
                          {order.id}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {order.date}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {order.customer.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.customer.email}
                        </p>
                        <p className="text-xs text-gray-400">
                          {order.customer.phone}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-8 h-8 rounded object-cover"
                            />
                            <div>
                              <p className="text-sm text-gray-900">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-400">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <p className="font-bold text-gray-900">
                        {formatCurrency(order.total)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {order.items.length} item(s)
                      </p>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div>
                        <span
                          className={`inline-flex px-2 py-1 text-xs rounded-full ${getPaymentStatusBadge(order.paymentStatus)}`}
                        >
                          {order.paymentStatus}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">
                          {order.paymentMethod}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex px-2 py-1 text-xs rounded-full ${statusBadge.color}`}
                      >
                        {statusBadge.label}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowDetailsModal(true);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setSelectedStatus(order.status);
                            setStatusNote("");
                            setShowUpdateStatusModal(true);
                          }}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Update Status"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">No orders found</p>
          </div>
        )}

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
            <span className="text-gray-600">
              Showing {filteredOrders.length} of {orders.length} orders
            </span>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                Total Value:{" "}
                {formatCurrency(orders.reduce((sum, o) => sum + o.total, 0))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {/* Order Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Order Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedOrder.date} at {selectedOrder.time}
                  </p>
                  <p className="text-xs text-gray-400">
                    Last updated: {selectedOrder.updatedAt}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Payment Method</p>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedOrder.paymentMethod}
                  </p>
                  <span
                    className={`inline-flex px-2 py-0.5 text-xs rounded-full mt-1 ${getPaymentStatusBadge(selectedOrder.paymentStatus)}`}
                  >
                    {selectedOrder.paymentStatus}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Order Status</p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusBadge(selectedOrder.status).color}`}
                  >
                    {getStatusBadge(selectedOrder.status).label}
                  </span>
                </div>
              </div>

              {/* Customer Information */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User size={16} />
                  Customer Information
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-900">
                    {selectedOrder.customer.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.customer.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.customer.phone}
                  </p>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin size={16} />
                  Shipping Information
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-900">
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
                      <p className="text-sm text-gray-600">
                        Carrier: {selectedOrder.carrier}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Order Items
                </h4>
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
                        <p className="text-xs text-gray-500">
                          {item.brand} | SKU: {item.sku}
                        </p>
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

              {/* Order Summary */}
              <div className="flex justify-end">
                <div className="w-80">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatCurrency(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Shipping Fee</span>
                    <span>
                      {selectedOrder.shippingFee === 0
                        ? "Free"
                        : formatCurrency(selectedOrder.shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-t border-gray-100 font-bold">
                    <span>Total</span>
                    <span className="text-lg">
                      {formatCurrency(selectedOrder.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    📝 Note: {selectedOrder.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedOrder(selectedOrder);
                  setSelectedStatus(selectedOrder.status);
                  setShowUpdateStatusModal(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Status Modal */}
      {showUpdateStatusModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Update Order Status
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Order ID: {selectedOrder.id}
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tracking Number (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Enter tracking number"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Carrier (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., LBC, 2GO, J&T"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Internal Notes
                </label>
                <textarea
                  rows={3}
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="Add a note about this status update..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setShowUpdateStatusModal(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateOrderStatus(
                    selectedOrder.id,
                    selectedStatus,
                    statusNote,
                  );
                  setShowUpdateStatusModal(false);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminOrdersPage;
