import { IsString, IsNumber } from "class-validator";

export class TransferDto {
  @IsString()
  public transfer_id: string;

  @IsString()
  public meeting_log_id: string;

  @IsString()
  public transfer_type: string;

  @IsString()
  public unique_member_id: string;

  @IsString()
  public ik_number: string;

  @IsString()
  public new_unique_member_id: string;

  @IsString()
  public new_ik_number: string;

  @IsNumber()
  public transfer_status: number;

  @IsString()
  public new_member_details_id: string;

  @IsString()
  public date_logged: string;

  @IsString()
  public staff_id: string;

  @IsString()
  public app_version: string;

  @IsString()
  public imei: string;
}
