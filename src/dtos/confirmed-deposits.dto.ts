import { IsString } from "class-validator";

export class ConfirmedDepositsDto {
  @IsString()
  public deposit_id: string;

  @IsString()
  public operator_id: string;

  @IsString()
  public payment_claim_id: string;

  @IsString()
  public bank_name: string;

  @IsString()
  public date_of_confirmation: string;

  @IsString()
  public ik_number: string;

  @IsString()
  public amount_deposited: string;

  @IsString()
  public imei: string;

  @IsString()
  public app_version: string;

  @IsString()
  public hub_id: string;
}
