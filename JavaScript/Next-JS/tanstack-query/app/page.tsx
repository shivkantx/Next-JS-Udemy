import UserList from "@/components/UserList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">
            TanStack Query
          </span>
          <h1 className="text-3xl font-medium text-gray-900 mb-1">
            Query Demo
          </h1>
          <p className="text-sm text-gray-500">
            Live data fetching with caching, loading states, and error handling
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <UserList />
        </div>
      </main>
    </div>
  );
}
