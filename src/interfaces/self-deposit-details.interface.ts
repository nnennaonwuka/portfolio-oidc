import { PAYMENT_STATUS } from "@/enums/payment-status.enum";

export interface SelfDepositDetails {
  tg_id: string;
  date_logged: string;
  depositor_name: string;
  deposit_date: string;
  amount: string;
  latitude: string;
  longitude: string;
  bank_name: string;
  bank_community: string;
  bank_ward: string;
  receipt_id: string;
  staff_id: string;
  imei: string;
  app_version: string;
  bank_lga: string;
  pos_receipt_id: string;
  payment_status: PAYMENT_STATUS;
  receipt_url: string;
  comment: string;
}
