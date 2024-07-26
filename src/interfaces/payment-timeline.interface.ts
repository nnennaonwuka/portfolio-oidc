export interface PaymentTimeline {
  tg_id: string;
  date_logged: string;
  reference_id: string;
  delivery_flag: number;
  payment_flag: number;
  debt_flag: number;
  plan_flag: number;
  frequency: string;
  frequency_count: string;
  minimum_amount: string;
  completion_date: string;
  next_date: string;
  next_amount: string;
  staff_id: string;
  imei: string;
  app_version: string;
}
