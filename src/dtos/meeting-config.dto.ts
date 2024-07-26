import { IsNumber, IsString } from "class-validator";

export class MeetingConfigDto {
  @IsString()
  public meeting_config_id: string;

  @IsString()
  public type: string;

  @IsString()
  public name: string;

  @IsNumber()
  public min_size: number;

  @IsNumber()
  public max_size: number;
}
