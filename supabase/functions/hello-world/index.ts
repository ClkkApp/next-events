import { Client, Environment } from "npm:square";
import { v4 as uuidv4 } from "npm:uuid";

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

interface CreateSquarePaymentRequest {
  sourceId: string;
  amount: number;
  note: string; 
}

Deno.serve(async (req) => {
  console.log("Received request:", req);

  // Handle OPTIONS request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  try {
    const { sourceId, amount, note } =
      (await req.json()) as CreateSquarePaymentRequest;

    console.log("Creating Square payment done:", {
      sourceId,
      amount,
      note,
    });
    //Access Token
    const squareClient = new Client({
      accessToken: Deno.env.get("SQUARE_ACCESS_TOKEN"),
      environment: Environment.Sandbox,
    });

    console.log("Square client created");

    const paymentResponse = await squareClient.paymentsApi.createPayment({
      sourceId,
      idempotencyKey: uuidv4(),
      amountMoney: {
        amount: BigInt(amount), // API sends in cents always
        currency: "USD",
      },
      locationId: Deno.env.get("SQUARE_LOCATION_ID"),
      referenceId: note, // Using eventTitle as referenceId
      note: note, // Using ticketCount as note
    });

    console.log("Square payment createds:", paymentResponse.result);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: any) {
    console.error("Error creating Square payment:", error);
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 400,
      headers: {
            "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
});
