import { NextResponse } from "next/server";
import { Client, Environment } from "square";
import { v4 as uuidv4 } from "uuid";

console.log("Square access token:", process.env.SQUARE_ACCESS_TOKEN);
console.log("Square location ID:", process.env.SQUARE_LOCATION_ID);

interface CreateSquarePaymentRequest {
  sourceId: string;
  amount: number;
  eventTitle: string;
  ticketCount: number;
}

export async function POST(req: Request) {
  console.log("Received request:", req);
  try {
    const { sourceId, amount, eventTitle, ticketCount } =
      (await req.json()) as CreateSquarePaymentRequest;

    console.log("Creating Square payment:", {
      sourceId,
      amount,
      eventTitle,
      ticketCount,
    });

    const squareClient = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment:
        process.env.NODE_ENV === "development"
          ? Environment.Sandbox
          : Environment.Production,
    });

    console.log("Square client created");

    const paymentResponse = await squareClient.paymentsApi.createPayment({
      sourceId,
      idempotencyKey: uuidv4(),
      amountMoney: {
        amount: BigInt(amount * 100), // Convert to cents
        currency: "USD",
      },
      locationId: process.env.SQUARE_LOCATION_ID,
      referenceId: eventTitle, // Using eventTitle as referenceId
      note: `Ticket Count: ${ticketCount}`, // Using ticketCount as note
    });

    console.log("Square payment created:", paymentResponse.result);

    return NextResponse.json({
      success: true,
      payment: paymentResponse.result,
    });
  } catch (error: any) {
    console.error("Error creating Square payment:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
