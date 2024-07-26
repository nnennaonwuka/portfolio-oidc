import { IsString, IsNumber } from "class-validator";

export class SurveyQuestionDto {
  @IsString()
  public survey_question_id: string;

  @IsString()
  public survey_config_id: string;

  @IsNumber()
  public order: number;

  @IsString()
  public name: string;

  @IsString()
  public question: string;

  @IsString()
  public options: string;

  @IsString()
  public type: string;

  @IsString()
  public pre_question_value: string;

  @IsString()
  public pre_question_id: string;

  @IsString()
  public comparator: string;
}
