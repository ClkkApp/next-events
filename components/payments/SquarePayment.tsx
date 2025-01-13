"use client";

import { useState } from "react";
import { CashAppPay, PaymentForm } from "react-square-web-payments-sdk";

interface SquarePaymentProps {
  amount: number;
  eventTitle: string;
  ticketCount: number;
}

type PaymentState = "idle" | "processing" | "success" | "failed";

export default function SquarePayment({
  amount,
  eventTitle,
  ticketCount,
}: SquarePaymentProps) {
  const [paymentState, setPaymentState] = useState<PaymentState>("idle");

  const createPaymentRequest = () => {
    try {
      console.log("Creating payment request:", {
        countryCode: "US",
        currencyCode: "USD",
        total: {
          amount: amount.toString(),
          label: `${ticketCount} ticket${ticketCount > 1 ? "s" : ""} for ${eventTitle}`,
        },
      });
      return {
        countryCode: "US",
        currencyCode: "USD",
        total: {
          amount: amount.toString(),
          label: `${ticketCount} ticket${ticketCount > 1 ? "s" : ""} for ${eventTitle}`,
        },
      };
    } catch (error) {
      console.error("Error creating payment request:", error);
      throw error;
    }
  };

  const handlePaymentResponse = async (token: any) => {
    setPaymentState("processing");

    try {
      const response = await fetch("/api/square", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceId: token.token,
          amount,
          eventTitle,
          ticketCount,
        }),
      });

      console.log("Square payment response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Payment failed:", errorData.error);
        setPaymentState("failed");
        return;
      }

      const result = await response.json();

      if (result.success) {
        setPaymentState("success");
        console.log("Payment successful:", result.payment);
      } else {
        setPaymentState("failed");
        console.error("Payment failed:", result.error);
      }
    } catch (error: any) {
      setPaymentState("failed");
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div className="w-full">
      <form id="payment-form">
        <div id="cash-app-pay"></div>
        <div id="card-container"></div>
        <button id="card-button" type="button">
          Pay $1.00
        </button>
      </form>
      <div id="payment-status-container"></div>
    </div>
  );
}
