"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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

  // Mock cart items
  const cartItems = [
    {
      id: 1,
      title: "1oz Gold American Eagle",
      price: 1950.0,
      shipping: 15.0,
      quantity: 1,
      seller: "GoldExpert",
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d",
    },
    {
      id: 2,
      title: "Silver Canadian Maple x5",
      price: 165.0,
      shipping: 8.0,
      quantity: 1,
      seller: "SilverTrader",
      image: "https://images.unsplash.com/photo-1607292803062-5b8ff0531b88",
    },
  ];

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
                  <div className="col-span-2">
                    <label className="block text-sm text-[#C0C0C0] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-[#333333] border border-[#C0C0C0]/20 rounded px-3 py-2 text-[#C0C0C0]"
                    />
                  </div>
                </div>

                {/* Shipping Options */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-[#FFD700] mb-4">
                    Shipping Method
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-[#C0C0C0]/20 rounded-lg cursor-pointer hover:border-[#4169E1]">
                      <input
                        type="radio"
                        name="shipping"
                        className="mr-3"
                        defaultChecked
                      />
                      <div>
                        <div className="text-[#C0C0C0]">Standard Shipping</div>
                        <div className="text-sm text-[#C0C0C0]/60">
                          3-5 business days
                        </div>
                      </div>
                      <div className="ml-auto text-[#50C878]">$15.00</div>
                    </label>
                    <label className="flex items-center p-4 border border-[#C0C0C0]/20 rounded-lg cursor-pointer hover:border-[#4169E1]">
                      <input type="radio" name="shipping" className="mr-3" />
                      <div>
                        <div className="text-[#C0C0C0]">Express Shipping</div>
                        <div className="text-sm text-[#C0C0C0]/60">
                          1-2 business days
                        </div>
                      </div>
                      <div className="ml-auto text-[#50C878]">$25.00</div>
                    </label>
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

                  <div className="flex items-center gap-4 p-4 border border-[#C0C0C0]/20 rounded-lg">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="flex-1">
                      <div className="text-[#C0C0C0]">PayPal</div>
                      <div className="text-sm text-[#C0C0C0]/60">
                        Pay with your PayPal account
                      </div>
                    </div>
                    <Image
                      src="/paypal.png"
                      alt="PayPal"
                      width={40}
                      height={25}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[#FFD700]">
                  Review Order
                </h2>

                {/* Order Items */}
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
                          Seller: {item.seller}
                        </p>
                        <p className="text-sm text-[#C0C0C0]/60">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-[#50C878] font-bold">
                          ${item.price}
                        </div>
                        <div className="text-sm text-[#C0C0C0]/60">
                          +${item.shipping} shipping
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Terms and Conditions */}
                <div className="p-4 border border-[#C0C0C0]/20 rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className="mt-1" />
                    <span className="text-sm text-[#C0C0C0]/80">
                      I agree to the Terms of Service and acknowledge that my
                      order will be processed according to the PeerMetals
                      Purchase Protection Policy.
                    </span>
                  </label>
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
                  step < 3 ? setStep(step + 1) : router.push("/confirmation")
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

            {/* Order Details */}
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

            {/* Need Help? */}
            <div className="mt-6 pt-6 border-t border-[#C0C0C0]/20 text-center">
              <p className="text-sm text-[#C0C0C0]/60 mb-2">Need help?</p>
              <a
                href="/contact"
                className="text-[#4169E1] text-sm hover:text-[#4169E1]/80"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
