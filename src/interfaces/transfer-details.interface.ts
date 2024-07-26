import { PAYMENT_STATUS } from "@/enums/payment-status.enum";

export interface TransferDetails {
  tg_id: string;
  date_logged: string;
  amount: string;
  sender_name: string;
  transfer_date: string;
  narration: string;
  staff_id: string;
  imei: string;
  app_version: string;
  receipt_id: string;
  payment_status: PAYMENT_STATUS;
  comment: string;
}
