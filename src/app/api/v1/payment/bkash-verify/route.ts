import { NextResponse } from "next/server";

export async function POST() {
  const simulatedLatency = Math.floor(Math.random() * 25) + 35; // 35ms - 60ms

  // Simulate tokenized bKash payment verification payload
  return NextResponse.json(
    {
      status: "success",
      statusCode: "2000",
      statusMessage: "Successful",
      paymentID: "TRX_BKASH_98234120",
      trxID: "BKASH_9X82A41",
      amount: "2500.00 BDT",
      currency: "BDT",
      transactionStatus: "Completed",
      paymentExecuteTime: new Date().toISOString(),
      merchantInvoiceNumber: "INV-2025-0814",
      gateway: "bKash Tokenized Payment API v1.2",
    },
    {
      status: 200,
      headers: {
        "X-Server-Latency": `${simulatedLatency}ms`,
        "X-API-Environment": "Production (Simulated Payload)",
      },
    }
  );
}
