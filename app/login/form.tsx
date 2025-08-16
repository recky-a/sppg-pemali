'use client';

import InputPasswordContainer from '@/components/input-password';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { SignInSchema, SignInValues } from './validate';

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<SignInValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: SignInValues) {
    startTransition(async () => {
      const response = await authClient.signIn.email({
        ...data,
        callbackURL: '/back-office/dasbor',
      });

      if (response.error) {
        console.log('SIGN_IN:', response.error.message);
        toast.error(response.error.message);
      } else {
        router.push('/');
      }
    });
  }

  const getInputClassName = (fieldName: keyof SignInValues) =>
    cn(
      form.formState.errors[fieldName] &&
        'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20'
    );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="z-50 my-8 flex w-full flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email"
                  className={getInputClassName('email')}
                  disabled={isPending}
                  type="email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputPasswordContainer>
                  <Input
                    id="input-23"
                    className={cn('pe-9', getInputClassName('password'))}
                    placeholder="Password"
                    disabled={isPending}
                    type="password"
                    autoComplete="current-password"
                    {...field}
                  />
                </InputPasswordContainer>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="mt-5 w-full cursor-pointer"
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
