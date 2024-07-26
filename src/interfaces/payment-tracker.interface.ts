export interface PaymentTracker {
  tracker_id: string;
  tg_id: string;
  comment: string;
  deactivate_flag: number;
  member_verified_flag: number;
  staff_id: string;
  app_version: string;
  imei: string;
  phone_number: string;
  latitude: string;
  longitude: string;
  image_name: string;
  community_flag: number;
  payment_plan_flag: number;
}
