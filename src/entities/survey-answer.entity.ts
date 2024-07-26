import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { SurveyAnswer } from "@interfaces/survey-answer.interface";

@Entity()
export class SurveyAnswerEntity extends BaseEntity implements SurveyAnswer {
  @PrimaryColumn()
  unique_member_id: string;

  @PrimaryColumn()
  survey_question_id: string;

  @Column({ nullable: true })
  survey_log_id: string;

  @Column({ nullable: true })
  ik_number: string;

  @Column({ nullable: true })
  answer: string;

  @PrimaryColumn()
  date_logged: string;

  @PrimaryColumn()
  staff_id: string;

  @Column({ nullable: true })
  operator_id: string;

  @Column({ nullable: true })
  desc: string;

  @Column({ nullable: true })
  unique_entity_id: string;

  @Column({ nullable: true })
  entity_id: string;

  @Column({ nullable: true })
  staff_entity_id: string;

  @Column({ nullable: true })
  section: string;

  @Column({ nullable: true })
  app_version: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
