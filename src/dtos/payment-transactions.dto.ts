import { IsString, IsNumber } from "class-validator";

export class PaymentTransactionsDto {
  @IsString()
  public payment_transaction_id: string;

  @IsString()
  public tracker_id: string;

  @IsString()
  public tg_id: string;

  @IsString()
  public receipt_id: string;

  @IsString()
  public amount: string;

  @IsString()
  public receiver_name: string;

  @IsString()
  public date: string;

  @IsNumber()
  public member_verified_flag: number;

  @IsString()
  public app_version: string;

  @IsString()
  public imei: string;

  @IsString()
  public staff_id: string;
}
