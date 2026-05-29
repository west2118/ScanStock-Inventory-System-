export const validateTransaction = (data) => {
  const { items, customer_name, discount, customer_cash } = data;

  if (!items?.length) throw new Error("Please add at least one item.");
  if (!customer_name?.trim()) throw new Error("Customer name is required.");
  if (Number(discount) < 0) throw new Error("Discount cannot be negative.");
  if (!customer_cash || Number(customer_cash) <= 0) {
    throw new Error("Enter customer cash amount.");
  }
};

export const calculateSales = (items, discount, customer_cash) => {
  let grossSales = 0;
  let vatableSales = 0;
  let vatExemptSales = 0;
  let zeroRatedSales = 0;

  for (const item of items) {
    const itemTotal = Number(item.price) * Number(item.quantity);
    grossSales += itemTotal;

    switch (item.vatType?.toLowerCase()) {
      case "vat_exempt":
        vatExemptSales += itemTotal;
        break;

      case "zero_rated":
        zeroRatedSales += itemTotal;
        break;

      case "vatable":
        vatableSales += itemTotal;
        break;

      default:
        break;
    }
  }

  // ✅ Discount cannot exceed subtotal
  if (Number(discount) > grossSales) {
    throw new Error("Discount cannot exceed gross sales.");
  }

  const netSales = grossSales - discount;
  const ratio = grossSales === 0 ? 0 : netSales / grossSales;

  const adjustedVatableSales = vatableSales * ratio;
  const adjustedVatExemptSales = vatExemptSales * ratio;
  const adjustedZeroRatedSales = zeroRatedSales * ratio;

  const vatableNetOfVat = adjustedVatableSales / 1.12;
  const vatAmount = adjustedVatableSales - vatableNetOfVat;

  const totalAmount = netSales;
  const totalSales =
    vatableNetOfVat + adjustedVatExemptSales + adjustedZeroRatedSales;

  const changeAmount = customer_cash - netSales;

  if (changeAmount < 0) {
    throw new Error("Insufficient cash.");
  }

  return {
    grossSales,
    totalSales,
    netSales,
    vatAmount,
    changeAmount,
    vatable_sales: adjustedVatableSales,
    vat_exempt_sales: adjustedVatExemptSales,
    zero_rated_sales: adjustedZeroRatedSales,
    totalAmount,
  };
};
