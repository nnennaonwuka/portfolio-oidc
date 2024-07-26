import { IsNumber, IsString } from "class-validator";

export class DepositsDto {
  @IsString()
  public deposit_id: string;

  @IsString()
  public account_number: string;

  @IsString()
  public date_of_deposit: string;

  @IsString()
  public bank_name: string;

  @IsString()
  public amount_deposited: string;

  @IsString()
  public receipt_id: string;

  @IsString()
  public depositor: string;

  @IsString()
  public description: string;

  @IsString()
  public imei: string;

  @IsString()
  public app_version: string;

  @IsString()
  public time_of_deposit: string;

  @IsNumber()
  public status: number;

  @IsString()
  public hub_id: string;

  @IsString()
  public rejection_comment: string;

  @IsString()
  public rejection_date: string;

  @IsString()
  public reference_deposit_id: string;
}
