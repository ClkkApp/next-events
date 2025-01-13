import { NextResponse } from "next/server";
import { Client, Environment } from "square";
import { v4 as uuidv4 } from "uuid";

interface CreateSquarePaymentRequest {
  sourceId: string;
  senderClkkId: string;
  recieverClkkId: string;
  amount: number;
  currency: string;
  transactionId: string;
  metadata: {
    clkk_id: string;
    "customer-email": string;
    "customer-name": string;
    "entered-amount": string;
  };
}

export async function POST(req: Request) {
  try {
    const {
      sourceId,
      senderClkkId,
      recieverClkkId,
      amount,
      currency,
      transactionId,
      metadata,
    } = (await req.json()) as CreateSquarePaymentRequest;

    console.log("Creating Square payment:", {
      sourceId,
      senderClkkId,
      recieverClkkId,
      amount,
      currency,
      transactionId,
      metadata,
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
        amount: BigInt(amount),
        currency,
      },
      locationId: process.env.SQUARE_LOCATION_ID,
      referenceId: senderClkkId,
      note: JSON.stringify(metadata),
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
