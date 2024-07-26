import { IsString } from "class-validator";

export class ActivityLogDto {
  @IsString()
  public activity_log_id: string;

  @IsString()
  public meeting_log_id: string;

  @IsString()
  public unique_member_id: string;

  @IsString()
  public ik_number: string;

  @IsString()
  public type: string;

  @IsString()
  public sub_activity_log_id: string;

  @IsString()
  public staff_id: string;

  @IsString()
  public operator_id: string;

  @IsString()
  imei: string;

  @IsString()
  public app_version: string;

  @IsString()
  public date_logged: string;
}
