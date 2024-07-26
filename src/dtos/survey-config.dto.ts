import { IsString } from "class-validator";

export class SurveyConfigDto {
  @IsString()
  public survey_config_id: string;

  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsString()
  public type: string;
}
