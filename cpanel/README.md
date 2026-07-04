# cPanel deployment notes

## Overview
This folder contains a simple Node entrypoint for launching the Next.js frontend on a cPanel-style hosting account.

## Recommended setup
1. Upload the repository contents to your cPanel account root.
2. Install dependencies in the web app:
   ```bash
   cd web
   npm install
   npm run build
   ```
3. Start the app with:
   ```bash
   node ../cpanel/server.js
   ```
4. Point your domain or subdomain to the Node application using your host's application manager.

## Environment variables
Set the following values in your hosting panel or shell before launching:
- PORT
- HOST
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_IS_CLOUD
- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
- PAYSTACK_SECRET_KEY
- STRIPE_SECRET_KEY (optional, only if you plan to use Stripe cloud billing)

## Paystack setup
1. Create a Paystack account and generate a live public key and secret key.
2. Add the public key to the web app environment and the secret key to the server environment.
3. In Paystack, configure your success/cancel URLs to match your app domain.
4. For production, use Paystack webhooks and verify the signature in your server layer before turning on live billing.
5. Keep the public key in the frontend only and never expose the secret key in client-side code.

## Admin-side management guide
The app already includes role-based administration for team and billing control:
- Assign the first user as an admin in the database or through the onboarding flow.
- Admins can manage team members, invitations, API keys, and billing-related settings from the dashboard settings area.
- Managers can work inside the product, but only admins can manage team membership and sensitive account settings.
- For production operations, keep one person as the primary account owner/admin and use invite-based onboarding for the rest of the team.

Recommended operating model:
1. Create the organization and invite the main team members.
2. Give the account owner/admin the highest-privilege role.
3. Use the dashboard Settings area for team management and integration keys.
4. Keep billing, webhooks, and secret values in your hosting panel or environment manager, not inside the repo.

## Notes
If your cPanel plan does not support Node applications directly, use a subdomain with a Node app manager or deploy the built frontend to a static host and keep the API/backend on a separate server.
