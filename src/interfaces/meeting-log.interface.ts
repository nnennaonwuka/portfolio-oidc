export interface MeetingLog {
  meeting_log_id: string;
  meeting_config_id: string;
  start_date: string;
  end_date: string;
  duration: string;
  no_of_attendees: number;
  staff_id: string;
  operator_id: string;
  app_version: string;
  imei: string;
  meeting_status: number;
  failure_reason: string;
}
