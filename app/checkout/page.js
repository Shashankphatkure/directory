"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cartOperations } from "../../utils/cartOperations";
import {
  LockClosedIcon,
  CheckCircleIcon,
  CreditCardIcon,
  TruckIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    loadCheckoutData();
  }, []);

  const loadCheckoutData = async () => {
    try {
      const items = await cartOperations.getCartItems();
      if (items.length === 0) {
        router.push("/cart");
        return;
      }
      setCartItems(items);
    } catch (error) {
      console.error("Error loading checkout data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    try {
      // Basic form validation
      if (step !== 3) {
        setStep(step + 1);
        return;
      }

      // Simulate order processing
      setLoading(true);

      // Create a fake order ID
      const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();

      // Store order details if needed
      localStorage.setItem(
        "lastOrder",
        JSON.stringify({
          id: orderId,
          date: new Date().toISOString(),
          total: total,
          items: cartItems,
        })
      );

      // Clear the cart
      await cartOperations.clearCart();

      // Redirect to success page
      router.push("/success");
    } catch (error) {
      console.error("Error placing order:", error);
      // Show error message to user
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-[#C0C0C0]">Loading checkout...</div>
      </div>
    );
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingTotal = cartItems.reduce((sum, item) => sum + item.shipping, 0);
  const total = subtotal + shippingTotal;

  const steps = [
    { number: 1, title: "Shipping", icon: TruckIcon },
    { number: 2, title: "Payment", icon: CreditCardIcon },
    { number: 3, title: "Review", icon: ShieldCheckIcon },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Checkout Progress */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((s, i) => (
            <div key={s.number} className="flex items-center">
              <div className={`flex items-center ${i !== 0 ? "flex-1" : ""}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= s.number
                      ? "bg-[#50C878] text-white"
                      : "bg-[#333333] text-[#C0C0C0]/60"
                  }`}
                >
                  {step > s.number ? (
                    <CheckCircleIcon className="h-6 w-6" />
                  ) : (
                    <s.icon className="h-5 w-5" />
                  )}
                </div>
                <div
                  className={`ml-2 text-sm ${
                    step >= s.number ? "text-[#C0C0C0]" : "text-[#C0C0C0]/60"
                  }`}
                >
                  {s.title}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-px mx-4 my-4 ${
                    step > s.number ? "bg-[#50C878]" : "bg-[#333333]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Checkout Form */}
        <div className="lg:w-2/3">
          <div className="card p-6">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[#FFD700]">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#C0C0C0] mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#C0C0C0] mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-[#C0C0C0] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-[#C0C0C0] mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#C0C0C0] mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#C0C0C0] mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[#FFD700]">
                  Payment Method
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border border-[#C0C0C0]/20 rounded-lg">
                    <input
                      type="radio"
                      name="payment"
                      value="credit-card"
                      checked={paymentMethod === "credit-card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="flex-1">
                      <div className="text-[#C0C0C0]">Credit Card</div>
                      <div className="text-sm text-[#C0C0C0]/60">
                        Visa, Mastercard, American Express
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Image
                        src="/visa.png"
                        alt="Visa"
                        width={40}
                        height={25}
                      />
                      <Image
                        src="/mastercard.png"
                        alt="Mastercard"
                        width={40}
                        height={25}
                      />
                      <Image
                        src="/amex.png"
                        alt="Amex"
                        width={40}
                        height={25}
                      />
                    </div>
                  </div>

                  {paymentMethod === "credit-card" && (
                    <div className="space-y-4 p-4 border border-[#C0C0C0]/20 rounded-lg">
                      <div>
                        <label className="block text-sm text-[#C0C0C0] mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <label className="block text-sm text-[#C0C0C0] mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-[#C0C0C0] mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[#FFD700]">
                  Review Order
                </h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 border border-[#C0C0C0]/20 rounded-lg"
                    >
                      <div className="relative w-20 h-20">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[#C0C0C0] font-medium">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#C0C0C0]/60">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-[#50C878] font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-[#C0C0C0]/60">
                          +${item.shipping.toFixed(2)} shipping
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 border border-[#C0C0C0]/20 rounded-lg text-[#C0C0C0] hover:bg-[#333333]"
                >
                  Back
                </button>
              )}
              <button
                onClick={() =>
                  step < 3 ? setStep(step + 1) : handlePlaceOrder()
                }
                className="ml-auto px-6 py-2 bg-[#4169E1] text-white rounded-lg hover:bg-[#4169E1]/80 transition-colors"
              >
                {step === 3 ? "Place Order" : "Continue"}
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-6 text-[#FFD700]">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-[#C0C0C0]">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#C0C0C0]">
                <span>Shipping</span>
                <span>${shippingTotal.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-[#C0C0C0]/20">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-[#C0C0C0]">Total</span>
                  <span className="text-[#50C878]">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-sm text-[#C0C0C0]/60">
                <LockClosedIcon className="h-4 w-4" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#C0C0C0]/60">
                <ShieldCheckIcon className="h-4 w-4" />
                <span>Buyer Protection Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
