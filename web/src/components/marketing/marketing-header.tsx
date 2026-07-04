import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export function MarketingHeader() {
  const t = useTranslations('auth');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <a href={siteConfig.url} className="flex items-center gap-3">
          <Image src="/logo_light.svg" alt="" width={28} height={28} className="h-7 w-7 shrink-0 dark:hidden" priority />
          <Image src="/logo_dark.svg" alt="" width={28} height={28} className="hidden h-7 w-7 shrink-0 dark:block" priority />
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-foreground">{siteConfig.name}</span>
            <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">AI Search & LLM Visibility</span>
          </div>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <nav className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
            <Link href="/pricing" className="transition-colors hover:text-foreground">
              Pricing
            </Link>
            <a href={siteConfig.links.docs} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
              Docs
            </a>
          </nav>
          <Link href="/sign-in">
            <Button variant="ghost" size="sm">
              {t('signIn')}
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button size="sm">{t('createAccount')}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
