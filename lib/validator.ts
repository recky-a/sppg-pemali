import { z } from 'zod';
z.config(z.locales.id());
const newStatisticDataSchema = z.object({
  paudTk: z.int().optional(),
  sdGrade1To3: z.int().optional(),
  sdGrade4To6: z.int().optional(),
  juniorHigh: z.int().optional(),
  seniorHigh: z.int().optional(),
  toddlers: z.int().optional(),
  pregnantMothers: z.int().optional(),
  breastfeedingMothers: z.int().optional(),
  total: z.int().optional(),
});
export type StatisticDataFormValues = z.infer<typeof newStatisticDataSchema>;
export { newStatisticDataSchema };
