import UserList from "@/components/UserList";
import AddUserForm from "@/components/AddUserForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero header */}
      <div className="relative overflow-hidden border-b border-indigo-500/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-indigo-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-14 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            TanStack Query
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-slate-100 mb-3">
            User <span className="text-indigo-400">Management</span>
          </h1>
          <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            Create users and view the updated list instantly with React Query.
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left — Form */}
          <div className="lg:col-span-4">
            <div className="sticky top-6">
              <AddUserForm />
            </div>
          </div>

          {/* Right — User List */}
          <div className="lg:col-span-8">
            <UserList />
          </div>
        </div>
      </main>
    </div>
  );
}
