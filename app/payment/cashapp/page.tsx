"use client";

import { useEffect } from "react";

interface CashAppPaymentProps {
  searchParams: {
    applicationId: string;
    locationId: string;
    amount: string;
    recipientClkkId: string;
    userClkkId: string;
    userEmail: string;
    userName: string;
    functionsUrl: string;
    squareScriptUrl: string;
  };
}

export default function CashAppPayment({ searchParams }: CashAppPaymentProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/cashapp-payment.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const {
    applicationId,
    locationId,
    amount,
    recipientClkkId,
    userClkkId,
    userEmail,
    userName,
    functionsUrl,
    squareScriptUrl,
  } = searchParams;

  const params = new URLSearchParams({
    applicationId,
    locationId,
    amount,
    recipientClkkId,
    userClkkId,
    userEmail,
    userName,
    functionsUrl,
    squareScriptUrl,
  });

  return (
    <iframe
      src={`/cashapp-payment.html?${params.toString()}`}
      style={{ width: "100%", height: "100vh", border: "none" }}
    />
  );
}
