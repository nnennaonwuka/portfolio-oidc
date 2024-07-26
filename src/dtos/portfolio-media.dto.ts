import { IsString } from "class-validator";

export class PortfolioMediaDto {
  @IsString()
  public portfolio_media_id: string;

  @IsString()
  public topic: string;

  @IsString()
  public file_names: string;

  @IsString()
  public due_date: string;

  @IsString()
  public length: string;

  @IsString()
  public languages: string;

  @IsString()
  public additional_info: string;

  @IsString()
  public meeting_config_id: string;

  @IsString()
  public priority_level: string;

  @IsString()
  public risk_level: string;

  @IsString()
  public role: string;
}
