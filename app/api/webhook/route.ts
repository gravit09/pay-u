import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

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
    // Check webhook token
    const receivedToken = req.headers.get("x-webhook-token");

    if (receivedToken !== WEBHOOK_SECRET) {
      console.error("❌ Invalid Token");
      return NextResponse.json(
        { message: "Forbidden: Invalid Token" },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await req.json();

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
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 402 }
      );
    }

    // Prevent duplicate updates
    if (transaction.status === status) {
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

      return NextResponse.json(
        { message: "Wallet top-up successful!" },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: "Payment failed!" }, { status: 400 });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 }
    );
  }
}
