import { IsString } from "class-validator";

export class MemberUnavailableDto {
  @IsString()
  public member_unavailable_id: string;

  @IsString()
  public meeting_log_id: string;

  @IsString()
  public unique_member_id: string;

  @IsString()
  public ik_number: string;

  @IsString()
  public reason: string;

  @IsString()
  public rf_id: string;

  @IsString()
  public transfer_id: string;

  @IsString()
  public date_logged: string;

  @IsString()
  public staff_id: string;

  @IsString()
  public app_version: string;

  @IsString()
  public imei: string;
}
