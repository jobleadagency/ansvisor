export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$49',
    description: 'For lean teams that need visibility across AI search surfaces and weekly reporting.',
    features: ['Up to 3 brands', 'Weekly visibility reports', 'AI Search Optimization briefs'],
  },
  {
    name: 'Growth',
    price: '$149',
    description: 'For scaling teams managing more prompts, competitors, and growth initiatives.',
    features: ['Unlimited brands', 'Competitor benchmarking', 'Advanced content optimization'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For organizations that need security, governance, and dedicated rollout support.',
    features: ['SSO and audit logs', 'Dedicated onboarding', 'Self-hosted deployment options'],
  },
];

export const faqItems = [
  {
    question: 'Can I self-host Optumus Analytics?',
    answer: 'Yes. The platform supports self-hosted deployment and cloud hosting, so you can choose the operating model that fits your security and compliance needs.',
  },
  {
    question: 'How fast can we get insights live?',
    answer: 'Most teams can connect a brand and start tracking visibility within a day, using the guided onboarding and automated reporting workflows.',
  },
  {
    question: 'Do you support multiple AI engines?',
    answer: 'Yes. The platform covers major AI search surfaces including ChatGPT, Claude, Gemini, Google AI Overview, AI Mode, Copilot, Perplexity, and Grok.',
  },
];
