import ListedProducts from "../components/POS/ListedProducts";
import POSCart from "../components/POS/POSCart";
import { useCart } from "../hooks/useCart";

const POSPage = () => {
  const {
    items,
    setItems,
    addItem,
    removeItem,
    deleteItem,
    clearItem,
    updateItemQuantity,
    updateItemPrice,
  } = useCart();

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Products Grid */}
        <ListedProducts addItem={addItem} setItems={setItems} items={items} />

        {/* Right Column - Cart */}
        <POSCart
          items={items}
          addItem={addItem}
          removeItem={removeItem}
          deleteItem={deleteItem}
          clearItem={clearItem}
          updateItemQuantity={updateItemQuantity}
          updateItemPrice={updateItemPrice}
        />
      </div>
    </main>
  );
};

export default POSPage;
