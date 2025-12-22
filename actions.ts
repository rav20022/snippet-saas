"use server"; //  This marks all functions here as backend-only

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSnippet(formData: FormData) {
  // Check if user is logged in
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/");
  }

  // Check if the user is a "Pro"
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { snippets: true }, // Include their snippets so we can count them
  });

  if (!user) return { error: "User not found" };

  // The Business Logic: Enforce Limits
  // If user is NOT pro AND has 5 or more snippets -> Block them
  if (!user.isPro && user.snippets.length >= 5) {
    return { error: "Free plan limit reached. Please upgrade to Pro." };
  }

  // Extract data from the HTML form
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;
  const language = formData.get("language") as string;

  // Validation (Basic)
  if (!title || !code) {
    return { error: "Title and Code are required" };
  }

  // Save to Database
  await prisma.snippet.create({
    data: {
      title,
      code,
      language,
      userId: session.user.id, // Link to the logged-in user
      isPublic: false, // Default to private
    },
  });

  // Refresh the UI
  // This tells Next.js: "The data on the dashboard has changed, reload it."
  revalidatePath("/dashboard");
}