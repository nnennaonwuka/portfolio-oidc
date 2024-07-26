import { IsString } from "class-validator";

export class KnowledgeLogDto {
  @IsString()
  public knowledge_log_id: string;

  @IsString()
  public portfolio_media_id: string;

  @IsString()
  public unique_member_id: string;

  @IsString()
  public ik_number: string;

  @IsString()
  public topic: string;

  @IsString()
  public activity_log_id: string;

  @IsString()
  public language: string;

  @IsString()
  public staff_id: string;

  @IsString()
  public operator_id: string;

  @IsString()
  imei: string;

  @IsString()
  public app_version: string;

  @IsString()
  public date_logged: string;
}
