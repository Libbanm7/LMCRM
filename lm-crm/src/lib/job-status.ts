export const JOB_STATUSES = [
  'booked',
  'collected',
  'delivered',
  'invoiced',
  'paid',
  'cancelled',
] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];