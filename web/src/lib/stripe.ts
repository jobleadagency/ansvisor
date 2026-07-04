import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
const starterPriceId = process.env.STRIPE_STARTER_MONTHLY_PRICE_ID || 'price_placeholder';
const growthPriceId = process.env.STRIPE_GROWTH_MONTHLY_PRICE_ID || 'price_placeholder';

export const stripe = new Stripe(stripeSecretKey);

export const PRICE_IDS = {
  starter: {
    monthly: starterPriceId,
  },
  growth: {
    monthly: growthPriceId,
  },
} as const;
