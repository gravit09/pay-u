import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    // Update transactions older than 5 minutes to failed
    await prisma.topUpTransaction.updateMany({
      where: {
        status: "PROCESSING",
        startTime: {
          lt: fiveMinutesAgo,
        },
      },
      data: {
        status: "FAILED",
      },
    });
    await prisma.p2PTransaction.updateMany({
      where: {
        status: "PENDING",
        timestamp: {
          lt: fiveMinutesAgo,
        },
      },
      data: {
        status: "FAILED",
      },
    });
  } catch (error) {
    console.error("Error updating transactions:", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  } finally {
    await prisma.$disconnect();
  }
}
