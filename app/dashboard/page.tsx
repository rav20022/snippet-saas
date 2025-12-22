import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { createSnippet } from "@/actions";
import { UpgradeButton } from "./_components/upgrade-button";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  const snippets = await prisma.snippet.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage your code library</p>
          </div>

          {/* Pro Status Badge */}
          <div className="flex items-center gap-4">
            {user?.isPro ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200 rounded-full text-amber-800 font-medium text-sm">
                <span>🏆</span>
                <span>Pro Member</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm text-sm">
                <span className="text-slate-500">Free Plan (5 limit)</span>
                <UpgradeButton />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Create Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-slate-800 mb-4">New Snippet</h2>
              <form action={createSnippet} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input 
                    name="title" 
                    type="text" 
                    placeholder="e.g. Auth Helper"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Language</label>
                  <div className="relative">
                    <select name="language" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 appearance-none bg-white">
                      <option value="javascript">JavaScript</option>
                      <option value="typescript">TypeScript</option>
                      <option value="python">Python</option>
                      <option value="go">Go</option>
                    </select>
                    {/* Custom Arrow Icon */}
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Code</label>
                  <textarea 
                    name="code" 
                    placeholder="// paste your code here..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg font-mono text-sm h-40 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-slate-50" 
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                >
                  Save Snippet
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Snippet List */}
          <div className="lg:col-span-2 space-y-6">
            {snippets.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-400 text-lg">No snippets yet. Create your first one!</p>
              </div>
            ) : (
              snippets.map((snippet) => (
                <div key={snippet.id} className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                         <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                           {/* Icon based on language (simplified) */}
                           <span className="font-mono font-bold text-xs">{snippet.language.slice(0,2).toUpperCase()}</span>
                         </div>
                         <div>
                            <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">{snippet.title}</h3>
                            <p className="text-xs text-gray-500">{new Date(snippet.createdAt).toLocaleDateString()}</p>
                         </div>
                      </div>
                      <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200">
                        {snippet.language}
                      </span>
                    </div>
                    
                    <div className="relative">
                      <pre className="bg-slate-900 text-slate-50 p-4 rounded-xl text-sm overflow-x-auto font-mono leading-relaxed">
                        <code>{snippet.code}</code>
                      </pre>
                      {/* Copy Overlay Effect could go here later */}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}