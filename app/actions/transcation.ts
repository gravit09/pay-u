"use server";
import prisma from "@/db/db";
import { getServerSession } from "next-auth";
import crypto from "crypto";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

interface Payload {
  txnId: string;
  amount: number;
  timestamp: number;
}

export async function getBalance() {
  const session = await getServerSession(authOptions);
  const id = session?.user.id;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user?.Balance || 0;
}

export async function getTranscations() {
  const session = await getServerSession(authOptions);
  const id = session?.user.id;
  const transactions = await prisma.topUpTransaction.findMany({
    where: { userId: id },
  });
  return transactions;
}

function generateToken() {
  const val = Math.random() * 100;
  return val.toString();
}

export async function topUpWallet(amount: number, provider: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthenticated request");
  }

  const userId = session.user?.id;
  if (!userId) {
    throw new Error("Unauthenticated request");
  }

  const userExists = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userExists) {
    throw new Error("User not found");
  }

  const transaction = await prisma.topUpTransaction.create({
    data: {
      amount,
      provider,
      token: generateToken(),
      status: "PROCESSING",
      startTime: new Date(),
      user: {
        connect: { id: userId },
      },
    },
  });

  const txnId = transaction.id;
  const { payload, signature } = generateSignedPayload(txnId, amount);
  const bankUrl = `https://bob-sepia.vercel.app/payment?payload=${encodeURIComponent(
    payload
  )}&signature=${signature}`;

  return { transaction, bankUrl };
}

const generateSignedPayload = (
  txnId: string,
  amount: number
): { payload: string; signature: string } => {
  const payload: Payload = {
    txnId,
    amount,
    timestamp: Date.now(),
  };

  const payloadString = JSON.stringify(payload);

  const signature = crypto
    .createHmac("sha256", process.env.SECRET_KEY || "testkey")
    .update(payloadString)
    .digest("hex");

  return { payload: payloadString, signature };
};

export async function p2pTransfer(username: string, amount: number) {
  if (amount <= 0) {
    return {
      success: false,
      message: "❌ Invalid transfer amount. Amount must be greater than zero.",
    };
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("🚫 Unauthenticated request. Please log in.");
  }

  const senderId = session.user.id;

  // Fetch sender
  const sender = await prisma.user.findUnique({
    where: { id: senderId },
  });

  if (!sender) {
    return {
      success: false,
      message: "Sender not found. Please try again.",
    };
  }

  if (sender.Balance < amount) {
    return {
      success: false,
      message: "💰 Insufficient balance. You don't have enough funds.",
    };
  }

  // Fetch receiver
  const receiver = await prisma.user.findFirst({
    where: {
      username: { equals: username, mode: "insensitive" },
    },
  });

  if (!receiver) {
    return {
      success: false,
      message: "Reciever with this ID does't exsist Please re-verify",
    };
  }

  if (receiver.id === senderId) {
    return {
      success: false,
      message: "Can't Send Money To Yourself",
    };
  }

  try {
    await prisma.$transaction([
      prisma.$queryRaw`SELECT * FROM "User" WHERE "id" = ${senderId} FOR UPDATE`, // this line of code is used to lock the balance
      prisma.user.update({
        where: { id: senderId },
        data: { Balance: { decrement: amount } },
      }),

      prisma.user.update({
        where: { id: receiver.id },
        data: { Balance: { increment: amount } },
      }),

      prisma.p2PTransaction.create({
        data: {
          senderId,
          receiverId: receiver.id,
          amount,
          status: "SUCCESS",
        },
      }),
    ]);
    return {
      success: true,
      message: `✅ ₹${amount} successfully transferred to @${username}!`,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`❌ Transaction failed: ${error.message}`);
    } else {
      throw new Error("❌ Transaction failed: Unknown error occurred.");
    }
  }
}

export async function getp2pTranscations() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  const transactions = await prisma.p2PTransaction.findMany({
    where: {
      OR: [{ senderId: id }, { receiverId: id }],
    },
  });
  return transactions;
}
