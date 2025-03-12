import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "testkey";

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, x-webhook-token",
      },
    }
  );
}

export async function POST(req: Request) {
  try {
    console.log("🔹 Webhook Received");

    // Log request headers
    console.log(
      "Headers:",
      JSON.stringify(Object.fromEntries(req.headers), null, 2)
    );

    // Check webhook token
    const receivedToken = req.headers.get("x-webhook-token");
    console.log("Received Token:", receivedToken);

    if (receivedToken !== WEBHOOK_SECRET) {
      console.error("❌ Invalid Token");
      return NextResponse.json(
        { message: "Forbidden: Invalid Token" },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await req.json();
    console.log("Request Payload:", body);

    const { txnId, amount, status } = body;

    if (!txnId || typeof amount !== "number" || !status) {
      console.error("❌ Invalid Payload:", body);
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    // Find the transaction
    const transaction = await db.topUpTransaction.findUnique({
      where: { id: txnId },
    });

    if (!transaction) {
      console.error(`❌ Transaction not found: ${txnId}`);
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 402 }
      );
    }

    // Prevent duplicate updates
    if (transaction.status === status) {
      console.log(`✅ Transaction ${txnId} already updated.`);
      return NextResponse.json(
        { message: "Transaction already updated" },
        { status: 200 }
      );
    }

    // Update transaction status
    const processedTxn = await db.topUpTransaction.update({
      where: { id: txnId },
      data: { status: status },
    });

    console.log(`🔄 Updated Transaction: ${txnId}`);

    // Get user linked to this transaction
    const txnUser = await db.topUpTransaction.findFirst({
      where: { id: txnId },
      include: { user: true },
    });

    if (!txnUser?.user?.id) {
      console.error("❌ User not found for transaction:", txnId);
      return NextResponse.json(
        { message: "User not found for transaction" },
        { status: 404 }
      );
    }

    const userId = txnUser.user.id;

    if (status === "SUCCESS") {
      await db.user.update({
        where: { id: userId },
        data: { Balance: { increment: processedTxn.amount } },
      });

      console.log(`✅ User ${userId} topped up wallet with ₹${amount}`);
      return NextResponse.json(
        { message: "Wallet top-up successful!" },
        { status: 200 }
      );
    }

    console.log(`❌ Transaction ${txnId} failed for user ${userId}`);
    return NextResponse.json({ message: "Payment failed!" }, { status: 400 });
  } catch (error: unknown) {
    console.error("🔥 Webhook Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 }
    );
  }
}
