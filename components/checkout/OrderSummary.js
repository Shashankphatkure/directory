export default function OrderSummary() {
  // Mock data - replace with real data later
  const order = {
    items: [
      {
        id: 1,
        title: "1oz Gold American Eagle",
        price: 1899.99,
        quantity: 1,
        shippingPrice: 9.99,
      },
    ],
    summary: {
      subtotal: 1899.99,
      shipping: 9.99,
      tax: 114.0,
      total: 2023.98,
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between py-2">
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <div className="text-right">
              <div>${item.price.toFixed(2)}</div>
              <div className="text-sm text-gray-600">
                + ${item.shippingPrice.toFixed(2)} shipping
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Totals */}
      <div className="space-y-3 border-t pt-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${order.summary.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>${order.summary.shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Estimated Tax</span>
          <span>${order.summary.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg pt-3 border-t">
          <span>Total</span>
          <span>${order.summary.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-6 text-sm text-gray-600">
        <p>
          By placing your order, you agree to PeerMetals.com's{" "}
          <a href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
