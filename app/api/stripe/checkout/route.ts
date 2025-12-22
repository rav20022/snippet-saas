import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Use whatever latest version VS Code suggests
  apiVersion: "2025-12-15.clover", 
});

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Create a Stripe Checkout Session
  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Snippet SaaS Pro",
            description: "Unlimited snippets & Private mode",
          },
          unit_amount: 2000, // €20.00 (amount is in cents)
        },
        quantity: 1,
      },
    ],
    mode: "payment", // "subscription" if you want recurring, "payment" for one-time
    success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?canceled=true`,
    // This lets us know WHO paid when Stripe tells us later
    metadata: {
      userId: session.user.id,
    },
  });

  // Return the URL so the frontend can redirect the user there
  return NextResponse.json({ url: checkoutSession.url });
}