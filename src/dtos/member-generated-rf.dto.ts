import { IsString, IsNumber } from "class-validator";

export class MemberGeneratedRfDto {
  @IsString()
  public rf_id: string;

  @IsString()
  public rf_type: string;

  @IsNumber()
  public rf_status: number;

  @IsString()
  public staff_id_created: string;

  @IsString()
  public staff_id_solved: string;

  @IsString()
  public staff_id_verified: string;

  @IsString()
  public hub_id: string;

  @IsString()
  public ik_number: string;

  @IsString()
  public unique_member_id: string;

  @IsNumber()
  public reopen_flag: number;

  @IsString()
  public date_logged: string;

  @IsString()
  public date_solved: string;

  @IsString()
  public date_verified: string;

  @IsString()
  public comment_created: string;

  @IsString()
  public comment_solved: string;

  @IsString()
  public comment_verified: string;

  @IsString()
  public app_version: string;

  @IsString()
  public imei: string;

  @IsString()
  public contact_person: string;

  @IsString()
  public contact_method: string;
}
