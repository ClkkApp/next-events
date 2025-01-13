"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const statusParam = searchParams.get("status");
    const messageParam = searchParams.get("message");

    console.log("statusParam", statusParam);
    console.log("messageParam", messageParam);

    setStatus(statusParam);
    setMessage(messageParam ? decodeURIComponent(messageParam) : null);
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Payment Status</h1>
        {status === "success" && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline">
              {message || "Your payment was successful."}
            </span>
          </div>
        )}
        {status === "failure" && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Failure!</strong>
            <span className="block sm:inline">
              {message || "Your payment failed."}
            </span>
          </div>
        )}
        {!status && (
          <div className="text-gray-700">
            <p>Waiting for payment status...</p>
          </div>
        )}
      </div>
    </div>
  );
}
