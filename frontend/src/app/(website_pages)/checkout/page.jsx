"use client";

import CheckoutSteps from "@/components/website/checkout/CheckoutSteps.jsx";
import ShippingForm from "@/components/website/checkout/ShippingForm.jsx";
import PaymentMethod from "@/components/website/checkout/PaymentMethod.jsx";
import OrderSummary from "@/components/website/checkout/OrderSummary.jsx";

import { useState } from "react";
import { client } from "@/utils/helper";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { useRazorpay } from "react-razorpay";
import { useDispatch } from "react-redux";
import { emptyCart } from "@/redux/features/cartSlice";

export default function CheckoutPage() {
  const { Razorpay } = useRazorpay();
  const router = useRouter();
  const dispatcher = useDispatch();

  const [paymentMode, setPaymentMode] = useState("cod");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  async function orderHandler() {
    if (isPlacingOrder) return;

    try {
      setIsPlacingOrder(true);

      // The order and cart endpoints are protected. Check the session first so
      // a missing/expired login does not surface as a generic Axios error after
      // the user has filled out the checkout form.
      try {
        await client.get("/user/get-me");
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Your session has expired. Please sign in to place an order.");
          router.push("/sign_in");
          return;
        }

        throw error;
      }

      // Check address
      if (!selectedAddress) {
        alert("Please select a shipping address");
        setIsPlacingOrder(false);
        return;
      }

      console.log("Payment Method:", paymentMode);
      console.log("Selected Address:", selectedAddress);

      const localCart = JSON.parse(localStorage.getItem("cart") || '{"items":[]}');
      await client.post("/cart/sync", {
        items: JSON.stringify(
          (localCart.items || []).map((item) => ({
            productId: item._id,
            qty: item.qty,
          }))
        ),
      });

      const response = await client.post("/order/place", {
        paymentMethod: paymentMode,
        shippingAddress: selectedAddress,
      });

      // COD
      if (paymentMode === "cod") {
        if (response.data.success) {
          // Clear cart from Redux and localStorage
          dispatcher(emptyCart());
          localStorage.removeItem("cart");

          router.push(`/thankyou?orderId=${response.data.orderId}`);
        } else {
          toast.error(
            response.data.message || "Order placement failed"
          );
        }

        return;
      }

      // UPI / Razorpay
      if (paymentMode === "upi") {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: response.data.amount,
          currency: response.data.currency || "INR",
          name: "Nestro",
          description: "Test Transaction",
          order_id: response.data.razorpay_order_id,

          handler: async (paymentResponse) => {
            try {
              const verification = await client.post("/order/verify-payment", {
                orderId: response.data.orderId,
                ...paymentResponse,
              });

              if (!verification.data.success) {
                throw new Error(verification.data.message || "Payment verification failed");
              }

              // Clear cart from Redux and localStorage
              dispatcher(emptyCart());
              localStorage.removeItem("cart");

              toast.success("Payment successful!");
              router.push(`/thankyou?orderId=${response.data.orderId}`);
            } catch (error) {
              console.error("Payment verification failed:", error);
              toast.error(
                error.response?.data?.message ||
                  error.message ||
                  "Payment succeeded, but verification failed. Please contact support."
              );
            }
          },

          prefill: {
            name: selectedAddress.fullName,
            contact: selectedAddress.mobile,
          },

          theme: {
            color: "#F37254",
          },
        };

        const razorpayInstance = new Razorpay(options);

        razorpayInstance.open();

        return;
      }

      toast.error("Invalid payment method");
    } catch (error) {
      console.log("ORDER ERROR:", error);

      console.error(
        "Order placement failed:",
        error.response?.data || error.message
      );

      const message = error.response?.data?.message || "Order could not be placed. Please try again.";
      toast.error(message);

      if (error.response?.status === 401) {
        router.push("/sign_in");
      }
    } finally {
      setIsPlacingOrder(false);
    }
  }

  return (
    <main className="bg-white min-h-screen">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 lg:py-14">

        {/* Checkout Heading */}
        <h1 className="font-serif text-3xl text-stone-900 mb-2">
          Checkout
        </h1>

        <p className="text-stone-500 mb-8">
          A few details and your order is on its way.
        </p>

        {/* Checkout Steps */}
        <CheckoutSteps activeStep={2} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">

          {/* Left Side */}
          <div>

            {/* Shipping Address */}
            <ShippingForm
              selectedAddress={selectedAddress}
              onAddressChange={setSelectedAddress}
            />

            {/* Payment Method */}
            <PaymentMethod
              paymentMode={paymentMode}
              setPaymentMode={setPaymentMode}
            />

            {/* Place Order */}
            <button
              onClick={orderHandler}
              type="button"
              disabled={isPlacingOrder}
              className="mt-8 w-full sm:w-auto px-8 py-3 rounded-sm bg-stone-900 text-stone-50 text-sm hover:bg-stone-800 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPlacingOrder
                ? "Placing order..."
                : "Place order"}
            </button>

          </div>

          {/* Right Side */}
          <OrderSummary />

        </div>
      </div>
    </main>
  );
}
