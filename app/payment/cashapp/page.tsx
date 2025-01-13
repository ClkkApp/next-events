"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function CashAppPaymentClient() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/cashapp-payment.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const applicationId = searchParams.get("applicationId") || "";
  const locationId = searchParams.get("locationId") || "";
  const amount = searchParams.get("amount") || "";
  const recipientClkkId = searchParams.get("recipientClkkId") || "";
  const userClkkId = searchParams.get("userClkkId") || "";
  const userEmail = searchParams.get("userEmail") || "";
  const userName = searchParams.get("userName") || "";
  const functionsUrl = searchParams.get("functionsUrl") || "";
  const squareScriptUrl = searchParams.get("squareScriptUrl") || "";
  const eventTitle = searchParams.get("eventTitle") || "";

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
    eventTitle,
  });

  return (
    <iframe
      src={`/cashapp-payment.html?${params.toString()}`}
      style={{ width: "100%", height: "100vh", border: "none" }}
    />
  );
}

export default function CashAppPayment() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CashAppPaymentClient />
    </Suspense>
  );
}
