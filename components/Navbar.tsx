import Link from "next/link";
import { auth } from "@/auth";
import { LoginButton, LogoutButton } from "./auth-buttons";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Snippet<span className="text-indigo-600">Saas</span>
          </span>
        </Link>

        {/* Right Action Section */}
        <div className="flex items-center gap-6">
          {session?.user ? (
            <>
              {/* Dashboard Link - The "Missing Button" */}
              <Link 
                href="/dashboard"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Dashboard
              </Link>
              
              <div className="h-4 w-px bg-gray-200"></div> {/* Divider */}

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-900">
                  {session.user.name}
                </span>
                <LogoutButton />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
                Features
              </Link>
              <Link href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
                Pricing
              </Link>
              <LoginButton />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}