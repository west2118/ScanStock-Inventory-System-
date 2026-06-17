
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Package,
  Truck,
  Clock,
  XCircle,
  RotateCcw,
  CheckCircle,
  Star,
} from "lucide-react";
import OrdersTab from "../../components/store/Orders/OrdersTab";
import OrdersList from "../../components/store/Orders/OrdersList";
import OrdersHeader from "../../components/store/Orders/OrdersHeader";
import OrderDetailsModal from "../../components/store/Orders/OrderDetailsModal";
import CancelOrderModal from "../../components/store/Orders/CancelOrderModal";
import ReturnOrderModal from "../../components/store/Orders/ReturnOrderModal";
import ReviewOrderModal from "../../components/store/Orders/ReviewOrderModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { fetchData } from "../../utils/utils";
import type { OrderType } from "../../types/order.types";
import type { PaginationType } from "../../utils/types";
import {
  getStatusBadge,
  getActionButtons,
} from "../../components/store/Badges/OrderBadges";

type OrderData = {
  orders: OrderType[];
  pagination: PaginationType;
};

const OrdersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "all";
  const search = searchParams.get("search") || "";

  const setActiveTab = (tab: string) => {
    setSearchParams((prev) => {
      prev.set("tab", tab);
      return prev;
    });
  };

  const setSearch = (value: string) => {
    setSearchParams((prev) => {
      if (value) {
        prev.set("search", value);
      } else {
        prev.delete("search");
      }
      return prev;
    });
  };

  const { data, isLoading } = useQuery<OrderData>({
    queryKey: ["orders-data", activeTab, search],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/orders/my-orders?status=${activeTab}&search=${search}`),
  });

  const { data: statsData } = useQuery({
    queryKey: ["orders-stats"],
    queryFn: fetchData(`${import.meta.env.VITE_API_URL}/orders/my-orders/stats`),
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const queryClient = useQueryClient();

  const submitReviewMutation = useMutation({
    mutationFn: async (reviewsData: any[]) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/orders/${selectedOrder?.id}/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ reviews: reviewsData }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      setShowReviewModal(false);
      queryClient.invalidateQueries({ queryKey: ["orders-data"] });
      queryClient.invalidateQueries({ queryKey: ["orders-stats"] });
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const actionHandlers = {
    onCancel: (order: OrderType) => {
      setSelectedOrder(order);
      setShowCancelModal(true);
    },
    onReturn: (order: OrderType) => {
      setSelectedOrder(order);
      setShowReturnModal(true);
    },
    onReview: (order: OrderType) => {
      setSelectedOrder(order);
      setShowReviewModal(true);
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <OrdersHeader search={search} onSearchChange={setSearch} />

        {/* Tabs */}
        <OrdersTab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          stats={statsData}
        />

        {/* Orders List */}
        <OrdersList
          orders={data?.orders ?? []}
          getStatusBadge={getStatusBadge}
          getActionButtons={(order) => getActionButtons(order, actionHandlers)}
          onViewDetails={(order) => {
            setSelectedOrder(order);
            setShowDetailsModal(true);
          }}
        />
      </div>

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <OrderDetailsModal
          selectedOrder={selectedOrder}
          onClose={() => setShowDetailsModal(false)}
        />
      )}

      {/* Cancel Order Modal */}
      {showCancelModal && selectedOrder && (
        <CancelOrderModal
          selectedOrder={selectedOrder}
          onClose={() => setShowCancelModal(false)}
          onConfirm={() => setShowCancelModal(false)}
        />
      )}

      {/* Return/Refund Modal */}
      {showReturnModal && selectedOrder && (
        <ReturnOrderModal
          selectedOrder={selectedOrder}
          onClose={() => setShowReturnModal(false)}
          onSubmit={() => setShowReturnModal(false)}
        />
      )}

      {/* Write Review Modal */}
      {showReviewModal && selectedOrder && (
        <ReviewOrderModal
          selectedOrder={selectedOrder}
          onClose={() => setShowReviewModal(false)}
          onSubmit={(reviewsData) => submitReviewMutation.mutate(reviewsData)}
          isSubmitting={submitReviewMutation.isPending}
        />
      )}
    </div>
  );
};

export default OrdersPage;
