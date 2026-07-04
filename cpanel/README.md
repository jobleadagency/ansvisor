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

## Notes
If your cPanel plan does not support Node applications directly, use a subdomain with a Node app manager or deploy the built frontend to a static host and keep the API/backend on a separate server.
