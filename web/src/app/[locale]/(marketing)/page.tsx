import { ArrowRight, BarChart3, BrainCircuit, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { pricingPlans } from '@/config/pricing';
import { comparisonPoints, testimonials } from '@/config/testimonials';

const pillars = [
  {
    title: 'Master SEO',
    description: 'Technical SEO, Content Score, AI visibility scoring, and discovery signals in one workspace.',
    icon: BarChart3,
  },
  {
    title: 'AI Search Optimization',
    description: 'Optimize for ChatGPT, Claude, Gemini, Google AI Overviews, AI Mode, Copilot, Perplexity, and Grok.',
    icon: BrainCircuit,
  },
  {
    title: 'Enterprise-ready security',
    description: 'Role-based access, audit trails, and production-safe deployment controls.',
    icon: ShieldCheck,
  },
];

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(109,94,245,0.16),_transparent_34%)]">
      <section className="container flex flex-col gap-10 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:py-28">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700 dark:border-violet-900 dark:bg-violet-950/50 dark:text-violet-300">
            <Sparkles className="h-4 w-4" />
            AI Search & LLM Visibility
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Measure what matters in the era of AI search.
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Optumus Analytics gives modern teams a clear view of their visibility across major AI-powered engines, competitors, prompts, and content opportunities.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/sign-up" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90">
              Start free trial
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/dashboard/insights" className="inline-flex items-center rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              Explore platform
            </Link>
          </div>
        </div>
        <div className="w-full max-w-xl rounded-3xl border border-border/80 bg-card/90 p-6 shadow-sm backdrop-blur">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['94/100', 'SEO Health Score'],
              ['91/100', 'AI Visibility Score'],
              ['89/100', 'Content Score'],
              ['24/7', 'Monitoring'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <p className="text-2xl font-semibold tracking-tight">{value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container px-6 pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold tracking-tight">{pillar.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{pillar.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600">Product coverage</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Track the engines that actually shape discovery</h2>
            <p className="mt-3 text-sm text-muted-foreground">From Google AI Overviews to ChatGPT, Claude, Gemini, Copilot, Perplexity, and Grok, Optumus Analytics gives you a single source of truth for visibility and opportunity.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['ChatGPT', 'Claude', 'Gemini', 'Google AI Overview', 'Google AI Mode', 'Copilot', 'Perplexity', 'Grok'].map((engine) => (
                <span key={engine} className="rounded-full border border-border/70 bg-background px-3 py-1 text-sm text-muted-foreground">
                  {engine}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border/70 bg-violet-50/80 p-8 shadow-sm dark:bg-violet-950/20">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600">Pricing</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Launch faster with a plan that scales</h2>
            <div className="mt-6 space-y-4">
              {pricingPlans.slice(0, 2).map((plan) => (
                <div key={plan.name} className="rounded-2xl border border-violet-200 bg-background/70 p-4 dark:border-violet-900">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-foreground">{plan.name}</p>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{plan.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/pricing" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
              View full pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600">Why teams switch</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Operational clarity for every AI visibility workflow</h2>
            <ul className="mt-6 space-y-3">
              {comparisonPoints.map((point) => (
                <li key={point} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-violet-600" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
                <p className="text-base text-foreground">“{testimonial.quote}”</p>
                <div className="mt-4">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
