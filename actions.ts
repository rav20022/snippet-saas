"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// fix: Explicitly add ': Promise<void>' to enforce no returns
export async function createSnippet(formData: FormData): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  const title = formData.get("title") as string;
  const code = formData.get("code") as string;
  const language = formData.get("language") as string;

  if (!title || !code) {
    // We cannot return an object here. we must redirect
    redirect("/dashboard?error=missing-fields");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { snippets: true },
  });

  if (!user) redirect("/");

  // Check limits
  if (!user.isPro && user.snippets.length >= 5) {
    redirect("/dashboard?error=limit-reached");
  }

  await prisma.snippet.create({
    data: {
      title,
      code,
      language,
      userId: session.user.id,
      isPublic: false,
    },
  });

  revalidatePath("/dashboard");
  // Function ends here naturally (returns void)
}