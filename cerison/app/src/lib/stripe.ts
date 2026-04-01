/**
 * Stripe singleton — instantiated once per cold start.
 * Avoids re-creating the SDK client on every request in serverless functions.
 *
 * Usage: import { stripe } from '@/lib/stripe'
 */
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('[stripe.ts] STRIPE_SECRET_KEY is not set — cannot initialise Stripe client')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
  appInfo: {
    name: 'cpm-puck',
    version: '1.0.0',
  },
})
