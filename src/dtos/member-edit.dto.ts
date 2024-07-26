import { IsNumber, IsString } from "class-validator";

export class MemberEditDto {
  @IsString()
  public unique_member_id: string;

  @IsString()
  public name: string;

  @IsString()
  public phone_no: string;

  @IsString()
  public ward_id: string;

  @IsString()
  public community_id: string;

  @IsString()
  public date_logged: string;

  @IsString()
  public staff_id: string;

  @IsString()
  public app_version: string;

  @IsString()
  public imei: string;

  @IsNumber()
  public approved_status: number;
}
