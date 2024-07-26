import { IsNumber, IsString } from "class-validator";

export class FlagErrorDto {
  @IsString()
  public ik_number: string;

  @IsString()
  public unique_entity_id: string;

  @IsNumber()
  public bank_card_id: number;

  @IsString()
  public error_message: string;
}
