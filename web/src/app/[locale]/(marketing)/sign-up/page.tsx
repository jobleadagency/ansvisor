import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SignUpForm } from '@/components/auth/sign-up-form';
import { Sparkles } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[radial-gradient(circle_at_top_left,_rgba(109,94,245,0.12),_transparent_35%)] p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="rounded-2xl border border-border/80 bg-card/90 p-5 shadow-sm backdrop-blur">
          <div className="mb-5 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Optumus Analytics</p>
              <p>Launch your AI visibility program with confidence.</p>
            </div>
          </div>
          <SignUpCard />
        </div>
      </div>
    </div>
  );
}

function SignUpCard() {
  const t = useTranslations('auth');

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{t('signUp')}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t('hasAccount')}{' '}
          <Link
            href="/sign-in"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {t('signIn')}
          </Link>
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}
