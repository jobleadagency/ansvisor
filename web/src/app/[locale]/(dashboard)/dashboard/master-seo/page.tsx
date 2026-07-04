import { ArrowUpRight, BarChart3, BrainCircuit, CheckCircle2, ScanSearch, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

const metrics = [
  { label: 'SEO Health Score', value: '94/100', detail: 'Technical + content + performance' },
  { label: 'AI Visibility Score', value: '91/100', detail: 'Across ChatGPT, Claude, Gemini, Copilot' },
  { label: 'Content Score', value: '89/100', detail: 'Entity coverage and freshness' },
];

const capabilities = [
  'Automatic metadata, canonical URLs, structured data, and schema validation',
  'AI Search Optimization for ChatGPT, Claude, Gemini, Google AI Overviews, and Copilot',
  'Weekly reports, PDF/CSV export, and scheduled audits',
];

export default function MasterSeoPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-background via-background to-violet-50/70 p-6 shadow-sm dark:from-card dark:to-violet-950/20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700 dark:border-violet-900 dark:bg-violet-950/50 dark:text-violet-300">
              <Sparkles className="h-4 w-4" />
              Master SEO
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight">Optimize discoverability everywhere — search and AI.</h1>
              <p className="text-base text-muted-foreground">
                Optumus Analytics unifies technical SEO, AI Search Optimization, and performance monitoring into one executive-ready command center.
              </p>
            </div>
          </div>
          <Link href="/dashboard/insights" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
            Open visibility workspace
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{metric.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{metric.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-foreground">
            <ScanSearch className="h-4 w-4 text-violet-600" />
            What Master SEO automates
          </div>
          <div className="space-y-3">
            {capabilities.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/70 p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-2 text-sm font-medium text-foreground">
            <BarChart3 className="h-4 w-4 text-violet-600" />
            Intelligence modules
          </div>
          <div className="space-y-4">
            {[
              ['Technical SEO', 'Metadata, sitemaps, schema, redirects, and Core Web Vitals'],
              ['AI Search Optimization', 'Prompt coverage, snippet optimization, and citation probability'],
              ['Monitoring', 'Competitor comparison, scheduled reports, and PDF/CSV exports'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-xl border border-border/70 bg-background/70 p-4">
                <p className="font-medium text-foreground">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Production-ready visibility management</p>
            <p className="mt-1 text-sm text-muted-foreground">Built for ambitious teams that need clarity across SEO, AI engines, and growth performance.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Security-first
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
              <BrainCircuit className="h-4 w-4 text-violet-600" />
              AI-ready
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
