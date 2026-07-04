import { siteConfig } from '@/config/site';

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/70 bg-background/70 py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}. AI Search & LLM Visibility intelligence for modern teams.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href={siteConfig.legal.terms} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            Terms
          </a>
          <a href={siteConfig.legal.privacy} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
