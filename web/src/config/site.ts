export const siteConfig = {
  name: 'Optumus Analytics',
  description:
    'Track your visibility across ChatGPT, Claude, Gemini, Google AI Overviews, Google AI Mode, Perplexity, Grok, and Copilot with AI Search & LLM Visibility intelligence.',
  url: 'https://optumusanalytics.com',
  ogImage: 'https://optumusanalytics.com/og-image',
  links: {
    github: 'https://github.com/ansvisor/ansvisor',
    docs: 'https://docs.optumusanalytics.com',
  },
  legal: {
    privacy: 'https://optumusanalytics.com/privacy',
    terms: 'https://optumusanalytics.com/terms',
  },
} as const;

export type SiteConfig = typeof siteConfig;
