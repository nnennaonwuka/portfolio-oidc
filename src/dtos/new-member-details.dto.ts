import { IsNumber, IsString } from "class-validator";

export class NewMemberDetailsDto {
  @IsString()
  public new_member_details_id: string;

  @IsString()
  public transfer_id: string;

  @IsString()
  public name: string;

  @IsString()
  public dob: string;

  @IsString()
  public gender: string;

  @IsString()
  public phone_no: string;

  @IsString()
  public ward_id: string;

  @IsString()
  public community_id: string;

  @IsString()
  public staff_id: string;

  @IsString()
  public app_version: string;

  @IsString()
  public imei: string;

  @IsNumber()
  public status: number;
}
