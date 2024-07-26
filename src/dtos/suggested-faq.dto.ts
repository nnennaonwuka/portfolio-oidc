import { IsString } from "class-validator";

export class SuggestedFaqDto {
  @IsString()
  suggested_faq_id: string;

  @IsString()
  public question: string;

  @IsString()
  public meeting_log_id: string;

  @IsString()
  public staff_id: string;

  @IsString()
  public app_version: string;

  @IsString()
  public imei: string;
}
