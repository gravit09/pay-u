"use client";

import React, { useEffect, useState } from "react";
import { getTranscations, getp2pTranscations } from "../actions/transcation";
import { ArrowUpRight, ArrowDownLeft, RefreshCw } from "lucide-react";
import { getSession } from "next-auth/react";

interface TopUpTransaction {
  id: string;
  amount: number;
  status: "SUCCESS" | "FAILED" | "PROCESSING";
  token: string;
  provider: string;
  startTime: Date;
  userId: string;
}

interface P2PTransaction {
  id: string;
  senderId: string;
  receiverId: string;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  timestamp: Date;
}

interface TransactionWithType extends TopUpTransaction {
  type: "topup";
  timestamp: Date;
}

interface P2PTransactionWithType extends P2PTransaction {
  type: "p2p";
}

export default function TransactionsPage() {
  const [topUpTransactions, setTopUpTransactions] = useState<
    TopUpTransaction[]
  >([]);
  const [p2pTransactions, setP2pTransactions] = useState<P2PTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all"); // "all", "topup", or "p2p"
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const initSession = async () => {
      const session = await getSession();
      if (session?.user?.id) {
        setUserId(session.user.id);
      }
    };
    initSession();
    fetchAllTransactions();
  }, []);

  const fetchAllTransactions = async () => {
    setLoading(true);
    try {
      const [topUpData, p2pData] = await Promise.all([
        getTranscations(),
        getp2pTranscations(),
      ]);

      setTopUpTransactions(topUpData);
      setP2pTransactions(p2pData);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getAllTransactions = () => {
    const formattedTopUp = topUpTransactions.map((tx) => ({
      ...tx,
      type: "topup" as const,
      timestamp: new Date(tx.startTime),
    }));

    const formattedP2p = p2pTransactions.map((tx) => ({
      ...tx,
      type: "p2p" as const,
    }));

    return [...formattedTopUp, ...formattedP2p].sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  };

  const filteredTransactions = () => {
    const allTransactions = getAllTransactions();

    if (activeTab === "all") return allTransactions;
    if (activeTab === "topup")
      return allTransactions.filter((tx) => tx.type === "topup");
    if (activeTab === "p2p")
      return allTransactions.filter((tx) => tx.type === "p2p");

    return allTransactions;
  };

  const renderTransactionCard = (
    transaction: TransactionWithType | P2PTransactionWithType
  ) => {
    if (transaction.type === "topup") {
      return (
        <div
          key={transaction.id}
          className="bg-gray-50 rounded-lg p-4 mb-3 shadow-sm border border-gray-200"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <ArrowDownLeft className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="font-medium">Top Up</h3>
                <p className="text-sm text-gray-500">
                  Via {transaction.provider}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-green-600">
                +₹{transaction.amount}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(transaction.timestamp)}
              </p>
            </div>
          </div>
          <div className="mt-2 text-xs px-2 py-1 inline-block rounded-full bg-gray-200">
            {transaction.status}
          </div>
        </div>
      );
    } else {
      // P2P transaction
      const isOutgoing = transaction.senderId === userId;

      return (
        <div
          key={transaction.id}
          className="bg-gray-50 rounded-lg p-4 mb-3 shadow-sm border border-gray-200"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div
                className={`p-2 rounded-full mr-3 ${
                  isOutgoing ? "bg-red-100" : "bg-green-100"
                }`}
              >
                {isOutgoing ? (
                  <ArrowUpRight className="text-red-600" size={20} />
                ) : (
                  <ArrowDownLeft className="text-green-600" size={20} />
                )}
              </div>
              <div>
                <h3 className="font-medium">
                  {isOutgoing ? "Sent" : "Received"}
                </h3>
                <p className="text-sm text-gray-500">
                  {isOutgoing
                    ? `To: ${transaction.receiverId}`
                    : `From: ${transaction.senderId}`}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`font-semibold ${
                  isOutgoing ? "text-red-600" : "text-green-600"
                }`}
              >
                {isOutgoing ? "-" : "+"}₹{transaction.amount}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(transaction.timestamp)}
              </p>
            </div>
          </div>
          <div className="mt-2 text-xs px-2 py-1 inline-block rounded-full bg-gray-200">
            {transaction.status}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button
          onClick={fetchAllTransactions}
          className="bg-blue-50 text-blue-600 p-2 rounded-full hover:bg-blue-100"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
        <button
          className={`flex-1 py-2 rounded-md text-sm font-medium ${
            activeTab === "all" ? "bg-white shadow-sm" : ""
          }`}
          onClick={() => setActiveTab("all")}
        >
          All
        </button>
        <button
          className={`flex-1 py-2 rounded-md text-sm font-medium ${
            activeTab === "topup" ? "bg-white shadow-sm" : ""
          }`}
          onClick={() => setActiveTab("topup")}
        >
          Top Up
        </button>
        <button
          className={`flex-1 py-2 rounded-md text-sm font-medium ${
            activeTab === "p2p" ? "bg-white shadow-sm" : ""
          }`}
          onClick={() => setActiveTab("p2p")}
        >
          Transfers
        </button>
      </div>

      {/* Transaction List with Fixed Height and Scrolling */}
      <div className="h-96 overflow-y-auto pr-1 rounded-lg border border-gray-200 shadow-sm bg-white p-3">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredTransactions().length > 0 ? (
          filteredTransactions().map((transaction) =>
            renderTransactionCard(transaction)
          )
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
