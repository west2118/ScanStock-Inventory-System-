// AdminOrdersPage.jsx - Admin Orders Management
import { useReducer } from "react";
import OrdersSummaryStats from "../../components/Admin/Orders/OrdersSummaryStats";
import { fetchData } from "../../utils/utils";
import { useQuery } from "@tanstack/react-query";
import OrdersTable from "../../components/Admin/Orders/OrdersTable";
import ProcessOrderModal from "../../components/Admin/Orders/ProcessOrderModal";
import ShipOrderModal from "../../components/Admin/Orders/ShipOrderModal";
import DeliverOrderModal from "../../components/Admin/Orders/DeliverOrderModal";
import OrderDetailsModal from "../../components/store/Orders/OrderDetailsModal";

const initialState = {
  selectedOrder: null,

  detailsOpen: false,
  processOpen: false,
  shipOpen: false,
  deliverOpen: false,
};

const orderReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_DETAILS":
      return {
        ...state,
        selectedOrder: action.payload,
        detailsOpen: true,
      };

    case "OPEN_PROCESS":
      return {
        ...state,
        selectedOrder: action.payload,
        processOpen: true,
      };

    case "OPEN_SHIP":
      return {
        ...state,
        selectedOrder: action.payload,
        shipOpen: true,
      };

    case "OPEN_DELIVER":
      return {
        ...state,
        selectedOrder: action.payload,
        deliverOpen: true,
      };

    case "CLOSE_DETAILS":
      return {
        ...state,
        detailsOpen: false,
      };

    case "CLOSE_PROCESS":
      return {
        ...state,
        processOpen: false,
      };

    case "CLOSE_SHIP":
      return {
        ...state,
        shipOpen: false,
      };

    case "CLOSE_DELIVER":
      return {
        ...state,
        deliverOpen: false,
      };

    case "CLOSE_ALL":
      return {
        ...state,
        selectedOrder: null,
        detailsOpen: false,
        processOpen: false,
        shipOpen: false,
        deliverOpen: false,
      };

    default:
      return state;
  }
};

const AdminOrdersPage = () => {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  
  const { data: statsData } = useQuery({
    queryKey: ["branch-orders-stats"],
    queryFn: fetchData(`http://localhost:5001/api/orders/branch/stats`),
  });

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
      <OrdersSummaryStats stats={statsData} />

      {/* Orders Table */}
      <OrdersTable
        dispatch={dispatch}
        statsData={statsData}
      />

      <ProcessOrderModal
        isModalOpen={state.processOpen}
        isCloseModal={() => dispatch({ type: "CLOSE_PROCESS" })}
        orderId={state.selectedOrder?.id}
        orderNumber={state.selectedOrder?.orderNumber}
      />

      <ShipOrderModal
        isModalOpen={state.shipOpen}
        isCloseModal={() => dispatch({ type: "CLOSE_SHIP" })}
        orderId={state.selectedOrder?.id}
        orderNumber={state.selectedOrder?.orderNumber}
      />

      <DeliverOrderModal
        isModalOpen={state.deliverOpen}
        isCloseModal={() => dispatch({ type: "CLOSE_DELIVER" })}
        orderId={state.selectedOrder?.id}
        orderNumber={state.selectedOrder?.orderNumber}
      />

      {state.detailsOpen && state.selectedOrder && (
        <OrderDetailsModal
          selectedOrder={state.selectedOrder}
          onClose={() => dispatch({ type: "CLOSE_DETAILS" })}
        />
      )}
    </main>
  );
};

export default AdminOrdersPage;
