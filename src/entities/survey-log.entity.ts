import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { SurveyLog } from "@interfaces/survey-log.interface";

@Entity()
export class SurveyLogEntity extends BaseEntity implements SurveyLog {
  @PrimaryColumn()
  survey_log_id: string;

  @Column({ nullable: true })
  survey_config_id: string;

  @Column({ nullable: true })
  unique_member_id: string;

  @Column({ nullable: true })
  ik_number: string;

  @Column({ nullable: true })
  questions_answered: string;

  @Column({ nullable: true })
  activity_log_id: string;

  @Column({ nullable: true })
  imei: string;

  @Column({ nullable: true })
  date_logged: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  operator_id: string;

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
