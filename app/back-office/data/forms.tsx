'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import {
  newStatisticData,
  updateStatisticData,
} from '@/app/actions/statistic-data.action';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SelectStatisticData } from '@/db/schema';
import {
  newStatisticDataSchema,
  type StatisticDataFormValues,
} from '@/lib/validator';
import { toast } from 'sonner';

const formFieldsConfig = [
  { name: 'paudTk', label: 'PAUD / TK' },
  { name: 'sdGrade1To3', label: 'SD Kelas 1-3' },
  { name: 'sdGrade4To6', label: 'SD Kelas 4-6' },
  { name: 'juniorHigh', label: 'SMP' },
  { name: 'seniorHigh', label: 'SMA' },
  { name: 'toddlers', label: 'Balita' },
  { name: 'pregnantMothers', label: 'Ibu Hamil' },
  { name: 'breastfeedingMothers', label: 'Ibu Menyusui' },
  { name: 'total', label: 'Total' },
] as const;

function FormCreate() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<StatisticDataFormValues>({
    resolver: zodResolver(newStatisticDataSchema),
    defaultValues: {
      paudTk: 0,
      sdGrade1To3: 0,
      sdGrade4To6: 0,
      juniorHigh: 0,
      seniorHigh: 0,
      toddlers: 0,
      pregnantMothers: 0,
      breastfeedingMothers: 0,
      total: 0,
    },
  });

  async function onSubmit(values: StatisticDataFormValues) {
    startTransition(async () => {
      const { success, message } = await newStatisticData(values);
      if (success) {
        toast.success(message);
        form.reset();
        return;
      }
      toast.error(message);
      return;
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3">
          {formFieldsConfig.map((fieldInfo) => (
            <FormField
              key={fieldInfo.name}
              control={form.control}
              name={fieldInfo.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fieldInfo.label}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder={`Jumlah ${fieldInfo.label}`}
                      {...field}
                      onChange={(value) =>
                        field.onChange(value.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Menyimpan...' : 'Simpan Data Baru'}
        </Button>
      </form>
    </Form>
  );
}

type FormEditProps = {
  initialData: SelectStatisticData;
};

function FormEdit({ initialData }: FormEditProps) {
  const [formKey, setFormKey] = useState(Date.now());
  const [isPending, setTransition] = useTransition();
  const form = useForm<StatisticDataFormValues>({
    resolver: zodResolver(newStatisticDataSchema),
    defaultValues: {
      paudTk: initialData.paudTk ?? 0,
      sdGrade1To3: initialData.sdGrade1To3 ?? 0,
      sdGrade4To6: initialData.sdGrade4To6 ?? 0,
      juniorHigh: initialData.juniorHigh ?? 0,
      seniorHigh: initialData.seniorHigh ?? 0,
      toddlers: initialData.toddlers ?? 0,
      pregnantMothers: initialData.pregnantMothers ?? 0,
      breastfeedingMothers: initialData.breastfeedingMothers ?? 0,
    },
  });

  async function onSubmit(values: StatisticDataFormValues) {
    setTransition(async () => {
      const { success, message } = await updateStatisticData({
        ...values,
        id: initialData.id,
      });
      if (success) {
        toast.success(message);
        setFormKey(Date.now());
        return;
      }
      toast.error(message);
      return;
    });
  }

  return (
    <Form {...form} key={formKey}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
          {formFieldsConfig.map((fieldInfo) => (
            <FormField
              key={fieldInfo.name}
              control={form.control}
              name={fieldInfo.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fieldInfo.label}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder={`Jumlah ${fieldInfo.label}`}
                      {...field}
                      onChange={(value) =>
                        field.onChange(value.target.valueAsNumber)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
        </Button>
      </form>
    </Form>
  );
}

export { FormCreate, FormEdit };
