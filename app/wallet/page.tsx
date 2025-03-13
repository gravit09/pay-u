"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "../(components)/card";
import { Input } from "../(components)/input";
import { Wallet, ArrowUpCircle, Clock, RefreshCw } from "lucide-react";
import {
  topUpWallet,
  getBalance,
  getTranscations,
} from "../actions/transcation";

const banks = [
  { id: 1, name: "HDFC BANK" },
  { id: 2, name: "Bank of America" },
];

type Transaction = {
  id: string;
  status: string;
  token: string;
  provider: string;
  amount: number;
  startTime: Date;
  userId: string;
};

export default function TransactionsPage() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const balance = await getBalance();
      const fetchedTransactions = await getTranscations();
      setBalance(balance);
      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Redirect unauthenticated users to login
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchData();
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Wallet Card */}
        <Card className="p-6 space-y-6 shadow-md rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Wallet className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Your Wallet</h2>
            </div>
            <button
              onClick={fetchData}
              className="bg-blue-50 text-blue-600 p-2 rounded-full hover:bg-blue-100"
            >
              <RefreshCw size={20} />
            </button>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Current Balance</p>
            <p className="text-3xl font-bold text-gray-800">
              ₹{balance.toFixed(2)}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block text-gray-700">
                Select Bank
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
              >
                <option value="">Select a bank</option>
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.name}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block text-gray-700">
                Amount
              </label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <button
              className={`w-full p-3 text-white rounded-md flex items-center justify-center transition-colors ${
                !amount || !selectedBank
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={async () => {
                if (!amount || !selectedBank) return;

                try {
                  const { bankUrl } = await topUpWallet(
                    Number(amount),
                    selectedBank
                  );
                  window.open(bankUrl, "_blank");
                  await fetchData();
                  setAmount("");
                  setSelectedBank("");
                } catch (error) {
                  console.error("Error topping up wallet:", error);
                }
              }}
              disabled={!amount || !selectedBank}
            >
              <ArrowUpCircle className="w-5 h-5 mr-2" />
              Add Money
            </button>
          </div>
        </Card>

        {/* Transaction History */}
        <Card className="p-6 shadow-md rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Transaction History</h2>
            </div>
          </div>

          {/* Scrollable Transaction List with Border */}
          <div className="h-96 overflow-y-auto rounded-lg border border-gray-200 shadow-sm bg-white p-3">
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              </div>
            ) : transactions.length > 0 ? (
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">
                          Added money from {transaction.provider}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(transaction.startTime)}
                        </p>
                        <div className="mt-2">
                          <span
                            className={`text-xs px-2 py-1 inline-block rounded-full ${
                              transaction.status === "SUCCESS"
                                ? "bg-green-100 text-green-800"
                                : transaction.status === "FAILED"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                      <p className="font-semibold text-green-600">
                        +₹{transaction.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p>No transactions found</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
