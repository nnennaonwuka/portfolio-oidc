import { IsString } from "class-validator";

export class SurveyLogDto {
  @IsString()
  public survey_log_id: string;

  @IsString()
  public survey_config_id: string;

  @IsString()
  public unique_member_id: string;

  @IsString()
  public ik_number: string;

  @IsString()
  public questions_answered: string;

  @IsString()
  public activity_log_id: string;

  @IsString()
  public imei: string;

  @IsString()
  public date_logged: string;

  @IsString()
  public staff_id: string;

  @IsString()
  public app_version: string;
}
