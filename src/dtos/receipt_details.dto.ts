import { IsString } from "class-validator";

export class ReceiptDetailsDto {
  @IsString()
  public receipt_id: string;

  @IsString()
  public depositor_name: string;

  @IsString()
  public ik_number: string;

  @IsString()
  public date: Date;

  @IsString()
  amount_paid: string;

  @IsString()
  operator_id: string;

  @IsString()
  bank_name: string;

  @IsString()
  phone_number: string;

  @IsString()
  status: number;
}
