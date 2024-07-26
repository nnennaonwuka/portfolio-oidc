import { IsNotEmpty } from "class-validator";
import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { SurveyQuestion } from "@interfaces/survey-question.interface";

@Entity()
export class SurveyQuestionEntity extends BaseEntity implements SurveyQuestion {
  @PrimaryColumn()
  survey_question_id: string;

  @Column()
  @IsNotEmpty()
  survey_config_id: string;

  @Column()
  @IsNotEmpty()
  order: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  question: string;

  @Column()
  @IsNotEmpty()
  options: string;

  @Column()
  @IsNotEmpty()
  type: string;

  @Column({ nullable: true })
  input_regex: string;

  @Column({ nullable: true })
  pre_question_id: string;

  @Column({ nullable: true })
  pre_question_value: string;

  @Column({ nullable: true })
  comparator: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
