import { IsNumber, IsString } from "class-validator";

export class MeetingLogDto {
  @IsString()
  public meeting_log_id: string;

  @IsString()
  public meeting_config_id: string;

  @IsString()
  public start_date: string;

  @IsString()
  public end_date: string;

  @IsString()
  public duration: string;

  @IsNumber()
  public no_of_attendees: number;

  @IsString()
  public staff_id: string;

  @IsString()
  public operator_id: string;

  @IsString()
  public imei: string;

  @IsString()
  public app_version: string;

  @IsNumber()
  public meeting_status: number;

  @IsString()
  public failure_reason: string;
}
