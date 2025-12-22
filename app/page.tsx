import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 bg-gradient-to-b from-white to-gray-50">
        
        <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm text-indigo-800 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
          v1.0 is now live
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-4xl">
          Save your code. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
            Share your genius.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
          The industry standard platform for developers to store, manage, and monetize their code snippets. Secure, fast, and built for modern teams.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          {session ? (
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Go to Dashboard &rarr;
            </Link>
          ) : (
            <Link 
              href="/api/auth/signin" 
              className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Get Started for Free
            </Link>
          )}
          
          {/* THE FIX: We changed this from <button> to <Link> pointing to #pricing */}
          <Link 
            href="#pricing" 
            className="px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            View Pricing
          </Link>
        </div>

        <div className="mt-20 pt-10 border-t border-gray-200 w-full max-w-4xl">
          <p className="text-sm font-semibold text-gray-500 mb-6">POWERED BY MODERN STACK</p>
          <div className="flex justify-center gap-8 grayscale opacity-50">
            <span className="font-bold text-xl">Next.js</span>
            <span className="font-bold text-xl">Prisma</span>
            <span className="font-bold text-xl">Neon</span>
            <span className="font-bold text-xl">Stripe</span>
          </div>
        </div>
      </section>

      {/* 2. PRICING SECTION (New) */}
      <section id="pricing" className="py-24 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-slate-600 mb-16 max-w-2xl mx-auto">
            Start for free, upgrade when you need more power. No hidden fees.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Hobby</h3>
              <div className="text-4xl font-bold text-slate-900 mb-6">€0<span className="text-lg text-gray-500 font-normal">/mo</span></div>
              <p className="text-gray-500 mb-8">Perfect for getting started and personal projects.</p>
              
              <ul className="text-left space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-slate-700">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  5 Snippets
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Public sharing
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Community support
                </li>
              </ul>
              
              <Link href="/api/auth/signin" className="w-full block py-3 px-4 bg-white border border-slate-900 text-slate-900 font-bold rounded-lg hover:bg-gray-50 transition-colors">
                Get Started
              </Link>
            </div>

            {/* Pro Tier Card */}
            <div className="bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-800 flex flex-col relative overflow-hidden">
              {/* "Most Popular" Badge */}
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
              <div className="text-4xl font-bold text-white mb-6">€20<span className="text-lg text-slate-400 font-normal">/lifetime</span></div>
              <p className="text-slate-400 mb-8">For serious developers who need unlimited storage.</p>
              
              <ul className="text-left space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-slate-200">
                  <svg className="w-5 h-5 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Unlimited Snippets
                </li>
                <li className="flex items-center gap-3 text-slate-200">
                  <svg className="w-5 h-5 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Private Snippets
                </li>
                <li className="flex items-center gap-3 text-slate-200">
                  <svg className="w-5 h-5 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Priority Support
                </li>
              </ul>
              
              <Link href="/dashboard" className="w-full block py-3 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-900/50">
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}