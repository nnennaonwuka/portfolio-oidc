import { IsNumber, IsString } from "class-validator";

export class VerifyCardsDto {
  @IsString()
  public ik_number: string;

  @IsString()
  public unique_entity_id: string;

  @IsNumber()
  public bank_card_id: number;

  @IsString()
  public card_number: string;
}
