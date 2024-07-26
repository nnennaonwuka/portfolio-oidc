import { IsNumber, IsString } from "class-validator";

export class MemberCollectionCenterUpdateDto {
  @IsString()
  public unique_member_id: string;

  @IsString()
  public ik_number: string;

  @IsString()
  public collection_center_id: string;

  @IsString()
  public staff_id: string;

  @IsString()
  public app_version: string;

  @IsString()
  public imei: string;

  @IsString()
  public field_id: string;

  @IsNumber()
  approved_status: number;
}
