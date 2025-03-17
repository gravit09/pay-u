"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, ArrowRight, Loader } from "lucide-react";

export default function UserAuth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      if (session) {
        router.push("/dashboard");
      }
    }
    checkSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const res = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (res?.error) {
          throw new Error(res.error);
        }

        window.location.href = "/dashboard";
      } else {
        const res = await fetch("/login/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, username, password }),
        });

        if (!res.ok) {
          const { message } = await res.json();
          throw new Error(message || "Failed to create an account");
        }

        const loginRes = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (loginRes?.error) {
          throw new Error(loginRes.error);
        }

        window.location.href = "/dashboard";
      }
    } catch (error: Error | unknown) {
      setError(error instanceof Error ? error.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="px-8 py-6">
          <div className="flex justify-center mx-auto">
            <div
              className="h-12 w-12 cursor-pointer rounded-lg flex items-center justify-center"
              onClick={() => router.push("/")}
            >
              <span className="text-white text-xl font-bold">PayU</span>
            </div>
          </div>

          <h2 className="mt-6 text-2xl font-bold text-center text-gray-800 dark:text-white">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
            {isLogin
              ? "Sign in to access your account"
              : "Fill in your details to get started"}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                className="w-full pl-10 pr-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none transition-colors"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                aria-label="Email Address"
                required
              />
            </div>

            {!isLogin && (
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  className="w-full pl-10 pr-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none transition-colors"
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Username"
                  aria-label="Username"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                className="w-full pl-10 pr-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none transition-colors"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                aria-label="Password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              {isLogin && (
                <a
                  href="#"
                  className="text-sm text-black hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200 font-medium"
                >
                  Forgot Password?
                </a>
              )}
              <div className="flex-grow"></div>
              <button
                type="submit"
                className="px-6 py-3 text-sm font-medium text-white bg-black hover:bg-gray-900 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 flex items-center space-x-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{isLogin ? "Sign In" : "Create Account"}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="px-8 py-5 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              type="button"
              className="ml-2 text-sm font-semibold text-black hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200"
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
