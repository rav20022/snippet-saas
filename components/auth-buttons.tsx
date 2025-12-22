"use client"; // <---  This tells Next.js: "Send this JavaScript to the browser"

import { signIn, signOut } from "next-auth/react";

export function LoginButton() {
  return (
    <button
      onClick={() => signIn("github")}
      className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
    >
      Sign in with GitHub
    </button>
  );
}

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="text-sm text-gray-500 hover:text-black transition"
    >
      Sign Out
    </button>
  );
}