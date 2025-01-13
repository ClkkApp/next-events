"use client";

import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface PurchaseTicketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle?: string;
  ticketPrice: number;
}

export default function PurchaseTicketDrawer({
  isOpen,
  onClose,
  eventTitle,
  ticketPrice,
}: PurchaseTicketDrawerProps) {
  const [ticketCount, setTicketCount] = useState(1);
  const router = useRouter();

  const totalAmount = ticketCount * ticketPrice;

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      applicationId: process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID || "",
      locationId: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || "",
      amount: totalAmount.toString(),
      userEmail: "user@example.com",
      functionsUrl:
        "https://tmlfjxxnmdcpzzmezdgw.supabase.co/functions/v1/hello-world",
      squareScriptUrl: process.env.NEXT_PUBLIC_SQUARE_SCRIPT_URL || "",
      eventTitle: eventTitle || "",
    });

    router.push(`/cash-app-payment.html?${params.toString()}`);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[100]">
      <div className="fixed inset-0 bg-black/30 z-[100]" aria-hidden="true" />

      <div className="fixed inset-0 overflow-hidden z-[101]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto relative w-screen max-w-md transform transition-all duration-500 ease-in-out">
              <div className="flex h-full flex-col overflow-y-scroll bg-[#0e0a17] py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-xl font-semibold text-white">
                      Purchase Ticket
                      {eventTitle && (
                        <p className="text-sm text-gray-400 mt-1">
                          {eventTitle}
                        </p>
                      )}
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={onClose}
                        className="relative rounded-md bg-transparent text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#ff3c45]"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <form
                    onSubmit={handleContinueToPayment}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-white">
                        Number of Tickets
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={ticketCount}
                        onChange={(e) => setTicketCount(Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border border-[#261e36] bg-transparent px-3 py-2 text-white focus:border-[#ff3c45] focus:outline-none focus:ring-1 focus:ring-[#ff3c45]"
                      />
                      <p className="mt-2 text-sm text-gray-400">
                        Price per ticket: ${ticketPrice}
                      </p>
                      <p className="mt-1 text-sm text-white">
                        Total: ${totalAmount}
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="thm-btn w-full flex items-center justify-center gap-2"
                    >
                      Continue to Payment
                      <span className="icon-arrow-right"></span>
                    </button>
                  </form>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
