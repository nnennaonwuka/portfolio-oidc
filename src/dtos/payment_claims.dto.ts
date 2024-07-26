import { IsNumber, IsString } from "class-validator";

export class PaymentClaimsDto {
  @IsString()
  public payment_claim_id: string;

  @IsString()
  public ik_number: string;

  @IsString()
  public unique_member_id: string;

  @IsString()
  public account_name: string;

  @IsString()
  public amount_deposited: string;

  @IsString()
  public date_of_deposit: string;

  @IsString()
  public time_of_deposit: string;

  @IsString()
  public agent_name: string;

  @IsString()
  public pos_bank_community: string;

  @IsString()
  public comment: string;

  @IsString()
  public staff_id: string;

  @IsString()
  public imei: string;

  @IsString()
  public app_version: string;

  @IsNumber()
  public status: number;

  @IsString()
  public depositor_name: string;

  @IsString()
  public hub_id: string;

  @IsString()
  public delete_date: string;

  @IsString()
  public delete_comment: string;

  @IsNumber()
  public delete_flag: number;

  @IsNumber()
  public operator_id: string;

  @IsString()
  public receipt_image: string;
}
