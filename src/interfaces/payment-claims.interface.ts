export interface PaymentClaimsInterface {
  payment_claim_id: string;
  ik_number: string;
  unique_member_id: string;
  account_name: string;
  amount_deposited: string;
  date_of_deposit: string;
  time_of_deposit: string;
  agent_name: string;
  pos_bank_community: string;
  comment: string;
  staff_id: string;
  imei: string;
  app_version: string;
  status: number;
  depositor_name: string;
  hub_id: string;
  delete_date: string;
  delete_comment: string;
  delete_flag: number;
  operator_id: string;
  receipt_image: string;
  pos_bank_lga: string;
  pos_bank_ward: string;
}
