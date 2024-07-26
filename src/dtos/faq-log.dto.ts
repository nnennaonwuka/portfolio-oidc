import { IsString } from "class-validator";

export class FaqLogDto {
  @IsString()
  public faq_log_id: string;

  @IsString()
  public faq_id: string;

  @IsString()
  public unique_member_id: string;

  @IsString()
  public ik_number: string;

  @IsString()
  public activity_log_id: string;

  @IsString()
  public date_logged: string;

  @IsString()
  public staff_id: string;

  @IsString()
  public operator_id: string;


  @IsString()
  public imei: string;

  @IsString()
  public app_version: string;
}
