import { IsNumber, IsString } from "class-validator";

export class WalletDetailsDto {
  @IsString()
  public unique_entity_id: string;

  @IsString()
  public account_name: string;

  @IsString()
  public account_number: string;

  @IsString()
  public bank_name: string;

  @IsString()
  public role: string;

  @IsString()
  public entity_id: string;
}
