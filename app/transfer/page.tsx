"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { p2pTransfer, getp2pTranscations } from "../actions/transcation";
import { useSession } from "next-auth/react";
import { Card } from "../(components)/card";
import { Clock, CheckCircle, XCircle, AlertCircle, Send } from "lucide-react";

interface Transaction {
  id: string;
  senderId: string;
  receiverId: string;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  timestamp: Date;
}

export default function P2PTransfer() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState("");
  const { status } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);

  const quickSendAmounts = [100, 500, 1000, 2000, 5000];

  // Changed useState to useEffect to prevent infinite loop
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated") {
      const fetchTransactions = async () => {
        try {
          const fetchedTransactions = await getp2pTranscations();
          // Sort transactions by timestamp in descending order (newest first)
          const sortedTransactions = [...fetchedTransactions].sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          setTransactions(sortedTransactions);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchTransactions();
    }
  }, [status, router]);

  const handleQuickSend = (value: number) => {
    setAmount(value);
    setError("");
  };

  const handleTransfer = async () => {
    if (!username.trim() || !amount || amount <= 0) {
      setError("Please enter a valid username and amount.");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const response = await p2pTransfer(username, amount);

      // Check if response is a structured response object
      if (response && typeof response === "object") {
        if (!response.success) {
          setError(response.message || "Transfer failed. Please try again.");
          return;
        }

        // Success case
        alert(`₹${amount} sent to @${username} successfully!`);

        // Refresh transactions list after successful transfer
        const fetchedTransactions = await getp2pTranscations();
        // Sort transactions by timestamp in descending order (newest first)
        const sortedTransactions = [...fetchedTransactions].sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setTransactions(sortedTransactions);

        // Clear form after successful transfer
        setUsername("");
        setAmount(null);
      } else {
        // Fallback for unexpected response format
        throw new Error("Received invalid response format from server");
      }
    } catch (error: unknown) {
      console.error("Error processing transfer:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while sending money."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "FAILED":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "PENDING":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">
          Money Transfer
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Transfer Form */}
          <div className="w-full md:w-1/2">
            <div className="bg-white shadow-lg rounded-2xl p-8 border border-slate-200 transition-all hover:shadow-xl">
              <h2 className="text-2xl font-bold text-slate-800 mb-1">
                P2P Money Transfer
              </h2>
              <p className="text-slate-500 mb-6">
                Send money securely to friends & family
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 font-medium flex items-center">
                    <XCircle className="w-5 h-5 mr-2" />
                    {error}
                  </p>
                </div>
              )}

              {/* Username Input */}
              <div className="mb-5">
                <label className="block font-medium text-slate-700 mb-2">
                  Username (@handle)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    @
                  </span>
                  <input
                    type="text"
                    className="w-full border border-slate-300 rounded-lg p-3 pl-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block font-medium text-slate-700 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    className="w-full border border-slate-300 rounded-lg p-3 pl-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                    placeholder="Enter amount"
                    value={amount || ""}
                    onChange={(e) => setAmount(Number(e.target.value) || null)}
                  />
                </div>
              </div>

              {/* Quick Send Buttons */}
              <div className="mb-6">
                <p className="font-medium text-slate-700 mb-3">Quick Send:</p>
                <div className="grid grid-cols-5 gap-2">
                  {quickSendAmounts.map((value) => (
                    <button
                      key={value}
                      className={`px-2 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                        amount === value
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      }`}
                      onClick={() => handleQuickSend(value)}
                    >
                      ₹{value}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className={`w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg focus:ring-4 focus:ring-blue-300 transition-all duration-200 ${
                  isProcessing
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-blue-700 hover:shadow-lg"
                }`}
                onClick={handleTransfer}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Money
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Transaction History */}
          <div className="w-full md:w-1/2">
            <Card className="p-6 bg-white shadow-lg rounded-2xl border border-slate-200 transition-all hover:shadow-xl">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                <Clock className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-800">
                  Recent Transactions
                </h2>
              </div>

              <div className="h-[400px] overflow-y-auto custom-scrollbar">
                <div className="space-y-4 pr-2">
                  {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="p-4 border border-slate-200 rounded-xl hover:shadow-md transition-all duration-200 bg-slate-50"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-slate-700 mb-1">
                              Transaction ID:{" "}
                              <span className="text-slate-500 text-sm">
                                {transaction.id.substring(0, 8)}...
                              </span>
                            </p>
                            <p className="text-sm text-slate-500 mb-1">
                              {new Date(transaction.timestamp).toLocaleString()}
                            </p>
                            <div className="flex items-center mt-2">
                              <span className="mr-2 font-medium text-slate-700">
                                Status:
                              </span>
                              <span
                                className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  transaction.status === "SUCCESS"
                                    ? "bg-green-100 text-green-800"
                                    : transaction.status === "FAILED"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {getStatusIcon(transaction.status)}
                                <span className="ml-1">
                                  {transaction.status}
                                </span>
                              </span>
                            </div>
                          </div>
                          <p
                            className={`font-bold text-lg ${
                              transaction.status === "SUCCESS"
                                ? "text-green-600"
                                : "text-slate-700"
                            }`}
                          >
                            ₹{transaction.amount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <Clock className="w-8 h-8 text-slate-400" />
                      </div>
                      <p className="text-slate-500 font-medium">
                        No transactions yet.
                      </p>
                      <p className="text-slate-400 text-sm">
                        Your transaction history will appear here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
