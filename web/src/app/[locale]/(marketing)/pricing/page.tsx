import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { faqItems, pricingPlans } from '@/config/pricing';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(109,94,245,0.16),_transparent_34%)] px-6 py-20">
      <div className="container mx-auto max-w-6xl space-y-10">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-violet-600">Pricing</p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Flexible plans for AI visibility teams</h1>
          <p className="text-lg text-muted-foreground">Choose a plan that matches your team’s growth stage and deployment needs, from startup agility to enterprise governance.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div key={plan.name} className={`rounded-3xl border p-6 shadow-sm ${plan.highlighted ? 'border-violet-300 bg-violet-50/70 dark:border-violet-900 dark:bg-violet-950/20' : 'border-border/70 bg-card'}`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold tracking-tight">{plan.name}</h2>
                  {plan.highlighted ? <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground">Most Popular</span> : null}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <p className="text-4xl font-semibold tracking-tight">{plan.price}</p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90">
                Choose {plan.name}
              </Link>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <p className="font-medium text-foreground">{item.question}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
