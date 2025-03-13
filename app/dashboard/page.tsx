import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function Dashboard() {
  // Check authentication
  const session = await getServerSession(authOptions);

  // Redirect if not authenticated
  if (!session) {
    redirect("/login");
  }

  // Extract user information
  const { user } = session;
  const username = user?.username || "Guest";

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, <span className="font-semibold">{username}</span>!
        </p>
      </header>

      <main>
        <section className="bg-gray-50 p-4 rounded-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Account Information
          </h2>
          <div className="grid gap-3">
            <div className="p-3 bg-white rounded border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500">
                Your Session Data
              </h3>
              <pre className="mt-2 p-3 bg-gray-100 rounded text-sm overflow-auto max-h-40">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-12 pt-4 border-t text-center text-gray-500 text-sm">
        <p>Protected Dashboard • {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
