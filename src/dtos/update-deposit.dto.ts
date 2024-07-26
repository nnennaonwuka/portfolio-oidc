import { IsString } from "class-validator";

export class UpdateDto {
  @IsString()
  comment: string;
}
