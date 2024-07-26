import { IsString } from "class-validator";

export class SurveyAnswerDto {
  @IsString()
  public survey_log_id: string;

  @IsString()
  public survey_question_id: string;

  @IsString()
  public ik_number: string;

  @IsString()
  public unique_member_id: string;

  @IsString()
  public answer: string;

  @IsString()
  public date_logged: string;

  @IsString()
  public staff_id: string;

  @IsString()
  public desc: string;

  @IsString()
  public app_version: string;

  @IsString()
  public section: string;
}
