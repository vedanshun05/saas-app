# Chatalo

Chatalo is an AI-powered, voice-driven learning platform designed as a personal education companion. It enables users to engage in real-time conversational lessons tailored to their goals. Built with Next.js, Supabase, Clerk, and VPY, it supports authentication, subscription billing, and scalable features. The app offers customizable courses, progress tracking, and interactive voice sessions, making learning flexible, engaging, and monetizable.

## Table of contents

- About
- Features
- Tech stack
- Local setup
- Environment variables
- Scripts
- Project layout
- Deployment notes
- Contributing
- License

## About

Chatalo (the codebase in this repository) is a full-stack Next.js app that demonstrates a working foundation for a subscription-based, voice-first learning product. The UI and components are implemented with React (App Router), authentication is handled by Clerk, data storage and realtime capabilities are backed by Supabase, and AI/voice features are powered by Vapi (VPY Web SDK).

## Features

- AI-driven, voice-first interactive lessons
- Customizable "companions" (courses / tutors) with progress tracking
- Authentication with Clerk
- Subscription and billing pages (integration with Clerk Pricing components)
- Error monitoring via Sentry
- Supabase as the primary database and auth-adjacent client for server interactions

## Tech stack

- Next.js (App Router) — https://nextjs.org/
- React 19 — https://reactjs.org/
- TypeScript — https://www.typescriptlang.org/
- Clerk (authentication) — https://clerk.com/docs
- Supabase (database + realtime) — https://supabase.com/docs
- Vapi / VPY Web SDK (AI / voice interaction) — https://vapi.ai/ or https://www.vapi.ai/docs
- Sentry (error monitoring) — https://sentry.io/for/javascript/
- Tailwind CSS (styles) — https://tailwindcss.com/
- Radix UI primitives — https://www.radix-ui.com/

## Local setup

1. Install dependencies

```powershell
npm install
```

2. Copy the example env file or create a `.env.local` in the project root and add the required variables listed below.

3. Run the development server

```powershell
npm run dev
```

Open http://localhost:3000 in your browser.

## Environment variables

This project expects several environment variables to be set. Example values used during development are present in `.env.local` (do not commit secrets).

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY — Clerk front-end publishable key
- CLERK_SECRET_KEY — Clerk secret key (server)
- NEXT_PUBLIC_CLERK_SIGN_IN_URL — (optional) custom sign-in path
- NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL — fallback redirect
- NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL — fallback redirect
- NEXT_PUBLIC_SUPABASE_URL — Supabase project URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY — Supabase anon/public key
- NEXT_PUBLIC_VAPI_WEB_TOKEN — Vapi / VPY web token
- SENTRY_AUTH_TOKEN — (used in Sentry integration / CI for source map uploads)

Note: The app uses client-side public keys (NEXT_PUBLIC_*) for Supabase and Vapi; keep server-only secrets (like CLERK_SECRET_KEY) out of the browser.

## Scripts

The following npm scripts are available (from `package.json`):

- `npm run dev` — start Next.js dev server (uses turbopack)
- `npm run build` — build the app for production
- `npm run start` — start production server (after a build)
- `npm run lint` — run ESLint

## Project layout (key files)

Top-level folders and files you'll work with:

- `app/` — Next.js App Router pages and route handlers
  - `app/layout.tsx` — root layout (wraps pages with ClerkProvider, global styles)
  - `app/page.tsx` — home
  - `app/companions/` — list, create and detail pages for "companions"
  - `app/subscription/` — subscription / billing UI
  - `app/sign-in/` — custom sign-in route
- `components/` — React components used across the app
  - `CompanionCard.tsx`, `CompanionForm.tsx`, `CompanionsList.tsx`, `Navbar.tsx`, etc.
- `lib/` — integration helpers and SDK wrappers
  - `lib/supabase.ts` — Supabase client factory (injects Clerk access token)
  - `lib/vapi.sdk.ts` — Vapi (VPY) web SDK initialization
  - `lib/actions/companion.actions.ts` — companion-related server actions
- `public/` — static assets (icons, images)
- `instrumentation.ts` / `instrumentation-client.ts` — Sentry setup
- `middleware.ts` — Clerk middleware for the App Router
- `next.config.ts` — Next.js + Sentry config

## Architecture notes

- Authentication: Clerk is used for session management. The app wraps the root layout with `ClerkProvider` and uses server helpers like `auth()` and `currentUser()` in server components and API handlers.
- Database & Realtime: Supabase client is initialized using `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. The Supabase client in `lib/supabase.ts` attempts to attach a Clerk access token when available.
- AI / Voice: The Vapi web token (`NEXT_PUBLIC_VAPI_WEB_TOKEN`) initializes the VPY client in `lib/vapi.sdk.ts`. This powers voice-driven lessons and any client-side AI interactions.
- Monitoring: Sentry is configured for both client and server. See `instrumentation.ts` and `instrumentation-client.ts`.

## Deployment

Chatalo is ready for deployment to platforms that support Next.js (Vercel recommended):

1. Ensure the required environment variables are set in your hosting provider.
2. Build the app with `npm run build` and start the server or use provider-managed builds.
3. If using Sentry source map uploads in CI, configure `SENTRY_AUTH_TOKEN` and the `org` / `project` arguments in `next.config.ts`.

On Vercel specifically:

- Add the same env vars in the Vercel project settings
- Select the `main` branch and deploy

## Contributing

Contributions are welcome. A suggested workflow:

1. Fork the repository
2. Create a feature branch
3. Make changes, add tests where appropriate
4. Open a pull request with a clear description of changes

Before opening a PR, run `npm run lint` and `npm run build` to ensure there are no obvious issues.

## Notes & next steps

- Replace example values in `.env.local` with your real keys before using the app in production.
- Consider adding automated tests and CI to run linting, typechecks, and Sentry uploads.
- You may want to add a small seeding script for Supabase to create default companions/courses for development.

## License

This repository does not include a license file. Add a LICENSE if you intend to open-source or define usage terms.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
