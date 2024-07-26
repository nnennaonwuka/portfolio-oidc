import { IsNotEmpty } from "class-validator";
import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { SurveyConfig } from "@interfaces/survey-config.interface";

@Entity() // decorator
export class SurveyConfigEntity extends BaseEntity implements SurveyConfig {
  @PrimaryColumn()
  survey_config_id: string;

  @Column()
  @IsNotEmpty()
  type: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
