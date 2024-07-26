import { IsString } from "class-validator";

export class DefaultingTgDto {
  @IsString()
  public tg_id: string;

  @IsString()
  public opening_balance: string;

  @IsString()
  public program: string;

  @IsString()
  public defaulting_year: string;

  @IsString()
  public nature: string;

  @IsString()
  public risk_level: string;

  @IsString()
  public hub_id: string;

  @IsString()
  public staff_id: string;
}
