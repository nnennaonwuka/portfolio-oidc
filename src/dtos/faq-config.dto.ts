import { IsString } from "class-validator";

export class FaqConfigDto {
  @IsString()
  public faq_config_id: string;

  @IsString()
  public name: string;

  @IsString()
  public description: string;
}
