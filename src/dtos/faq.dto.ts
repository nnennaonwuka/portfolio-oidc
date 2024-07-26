import { IsString } from "class-validator";

export class FaqDto {
  @IsString()
  public faq_id: string;

  @IsString()
  public faq_config_id: string;

  @IsString()
  public question: string;

  @IsString()
  public portfolio_media_id: string;

  @IsString()
  public additional_info: string;
}
