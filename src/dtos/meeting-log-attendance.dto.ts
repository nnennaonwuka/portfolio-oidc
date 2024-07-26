import { IsNumber, IsString } from "class-validator";

export class MeetingLogAttendanceDto {
  @IsString()
  public meeting_log_id: string;

  @IsString()
  public unique_member_id: string;

  @IsString()
  public ik_number: string;

  @IsString()
  public date_joined: string;

  @IsNumber()
  public verification_flag: number;

  @IsString()
  public staff_id: string;

  @IsString()
  public operator_id: string;

  @IsString()
  public app_version: string;
}
