import { buttonVariants } from '@/components/ui/button';
import { type Metadata } from 'next';
import Link from 'next/link';
import SignInForm from './form';

export const metadata: Metadata = {
  title: 'Login',
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  console.log(params);
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="border-foreground/10 flex w-full flex-col rounded-2xl border px-8 py-5 md:w-96">
        <h1 className="text-primary mb-2">Login</h1>
        <p className="text-sm">Login menggunakan email dan password</p>
        <SignInForm />
        <div className="mx-auto flex items-center-safe justify-center-safe">
          <Link className={buttonVariants({ variant: 'secondary' })} href="/">
            Balik ke halaman utama
          </Link>
        </div>
      </div>
    </div>
  );
}
