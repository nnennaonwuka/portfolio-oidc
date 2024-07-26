export interface PaymentTransactions {
  payment_transaction_id: string;
  receipt_id: string;
  tracker_id: string;
  tg_id: string;
  amount: string;
  receiver_name: string;
  payment_method: string;
  comment: string;
  member_verified_flag: number;
  staff_id: string;
  app_version: string;
  imei: string;
  date: string;
  corrected_balance: string;
  balance_error_flag: number;
  phone_number: string;
  cash_deposit_flag: number;
  in_community_flag: number;
  latitude: string;
  longitude: string;
  pcs_logged_flag;
  pcs_id;
}
