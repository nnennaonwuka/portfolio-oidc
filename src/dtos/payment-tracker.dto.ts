import { IsString, IsNumber } from "class-validator";

export class PaymentTrackerDto {
  @IsString()
  public tracker_id: string;

  @IsString()
  public tg_id: string;

  @IsString()
  public comment: string;

  @IsNumber()
  public deactivate_flag: number;

  @IsNumber()
  public member_verified_flag: number;

  @IsString()
  public app_version: string;

  @IsString()
  public imei: string;

  @IsString()
  public staff_id: string;
}
