import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover", // Use the same version as before
});

export async function POST(req: Request) {
  const body = await req.text(); // Get raw body for verification
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    // Verify the event actually came from Stripe
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // Handle the specific event: "checkout.session.completed"
  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    
    // We retrieve the userId we stored in metadata during checkout
    const userId = session.metadata?.userId;

    if (!userId) {
      return new NextResponse("User ID missing in metadata", { status: 400 });
    }

    // Update the database
    await prisma.user.update({
      where: { id: userId },
      data: { isPro: true },
    });
    
    console.log(`User ${userId} has been upgraded to PRO!`);
  }

  return new NextResponse(null, { status: 200 });
}