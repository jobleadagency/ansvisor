# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.1] - 2026-05-26

### Added
- MCP server with API keys + `list_brands` and `get_visibility_summary` tools, exposed at `/api/mcp` (#20)
- MCP: `list_prompts` / `get_prompt` and `list_topics` / `get_topic` tools, plus parallel REST endpoints (#35)
- MCP: `list_content_opportunities` / `get_content_opportunity` tools + REST endpoints (#74)
- Anthropic Skills: Ansvisor AEO Coach ships in two flavours — MCP tool for Claude Desktop / Code / Cursor / Zed, and standalone REST for claude.ai web (#23)
- Analytics: PostHog + Vercel Analytics with self-host opt-in posture (#13)
- Analytics: universal user identification and onboarding-funnel instrumentation (#30)
- CSV export buttons on Topics (#53), Prompts (#54), and Answer Engine Insights (#73)
- Citations: searchable prompt combobox filter (#55)
- Sidebar: user profile chip (avatar + name) linking to settings (#52)
- Prompts: Competition column with a 5-bar difficulty meter (#82)
- Tracking: capture Perplexity `shopping_cards` into `prompt_results` (#83)
- Tracking: capture Google AI Mode `shoppingCards` into `prompt_results` (#86)
- Tracking: capture Microsoft Copilot `shoppingCards` into `prompt_results` (#87)
- DX: `supabase/seed.sql` ships a populated local dashboard (one demo org, brand, prompts, ~120 prompt results, competitors, content opportunities, AI traffic logs) — `demo@ansvisor.local` / `demo123` (#75)
- Tooling: Prettier configuration + CI workflow (format check & typecheck) (#80)

### Changed
- README: replaced the intro with a build-in-public manifesto (#90)
- README / docs metadata: tagline updated to "AI Visibility & AI Search Optimization" (#89)
- Docs: rewrote "What is Ansvisor?" around AI Search Visibility / GEO / AEO (#92)
- README: stargazers CTA above "Why Ansvisor?" (#77)
- Onboarding: signout button in the bottom-right corner (#68)
- Settings: contact-us CTA opens the contact page (#81)
- CI: auto-welcome first-time contributors on PRs only (#34, #59)

### Fixed
- Billing: block tracking + features for orgs without an active subscription (#56)
- Citations: group raw model slugs under display names in the Platforms filter (#48)
- Insights: adaptive Y-axis on the Brand vs Competitors chart (#37)
- Insights: silence navigation-cancellation toast (#70)
- MCP: use the app URL for the MCP endpoint (#33)
- UI: ComboboxTrigger overflow — respect caller width and clip long values (#91)
- Onboarding: preserve pending content opportunities (#63)
- UI: sign-in / sign-up header logo points at the marketing site (#57)
- UI: remove unused dashboard layout header (#36)
- Refresh stale package-lock metadata (#51)

## [0.1.0] - 2026-04-09

### Added
- Initial open-source release
- Web frontend (Next.js 16) with dashboard, analytics, and content optimization
- Backend server (Express) with multi-provider AI tracking (ChatGPT, Gemini, Perplexity, Grok, Claude)
- Docker Compose setup for self-hosting
- Multi-language support (13 languages, 18 regions)
- Plan-based feature gating (self-hosted, starter, growth, enterprise)
- Real-time brand visibility monitoring across AI search engines
- Competitor tracking and content optimization suggestions
- Prompt volume analysis
- Stripe integration for cloud billing
