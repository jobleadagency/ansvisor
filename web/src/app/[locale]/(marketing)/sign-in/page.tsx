import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SignInForm } from '@/components/auth/sign-in-form';
import { MailCheck, Sparkles } from 'lucide-react';

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ verified?: string }>;
}) {
  const params = await searchParams;
  const showVerificationBanner = params.verified === 'pending';

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[radial-gradient(circle_at_top_left,_rgba(109,94,245,0.12),_transparent_35%)] p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {showVerificationBanner && <VerificationBanner />}
        <div className="rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm backdrop-blur">
          <div className="mb-5 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Optumus Analytics</p>
              <p>Enterprise-grade AI visibility monitoring.</p>
            </div>
          </div>
          <SignInCard />
        </div>
      </div>
    </div>
  );
}

function VerificationBanner() {
  const t = useTranslations('auth');

  return (
    <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/50">
      <MailCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
      <p className="text-sm text-blue-800 dark:text-blue-300">{t('verificationPending')}</p>
    </div>
  );
}

function SignInCard() {
  const t = useTranslations('auth');

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{t('signIn')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t('noAccount')}{' '}
          <Link
            href="/sign-up"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {t('createAccount')}
          </Link>
        </p>
      </div>
      <SignInForm />
    </div>
  );
}
