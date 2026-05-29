import { CreditCard, Wallet, Eye, CheckCircle } from "lucide-react";
import type { TransactionType } from "../../utils/types";
import { dateFormatter, pesoFormatter } from "../../utils/utils";

const TransactionTableRow = ({
  transaction,
}: {
  transaction: TransactionType;
}) => {
  const getPaymentIcon = (method: string) => {
    return method === "cash" ? <Wallet size={14} /> : <CreditCard size={14} />;
  };

  return (
    <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div>
          <p className="font-mono text-sm font-medium text-gray-900">
            {transaction.transactionNumber}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {dateFormatter(transaction.createdAt)}
          </p>
        </div>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="text-sm text-gray-900">{transaction.customerName}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900 space-y-1">
          {transaction.items.length > 0 && (
            <div className="flex justify-between">
              <span>
                {`${transaction.items[0].quantity}x ${transaction.items[0].productName}`}
              </span>
            </div>
          )}

          {transaction.items.length > 1 && (
            <span className="text-xs text-gray-500">
              +{transaction.items.length - 1} other item
              {transaction.items.length - 1 > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <p className="text-sm font-bold text-gray-900">
          {pesoFormatter.format(Number(transaction.totalAmount))}
        </p>
      </td>
      <td className="px-6 py-4 text-center">
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
          {getPaymentIcon(transaction.paymentMethod)}
          <span className="capitalize">{transaction.paymentMethod}</span>
        </span>
      </td>
      <td className="px-6 py-4">
        <p className="text-sm text-gray-900">{transaction.handledBy}</p>
      </td>
      <td className="px-6 py-4 text-center">
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
          <CheckCircle size={12} />
          <span>{transaction.status}</span>
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <button
          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="View Details"
        >
          <Eye size={16} />
        </button>
      </td>
    </tr>
  );
};

export default TransactionTableRow;
