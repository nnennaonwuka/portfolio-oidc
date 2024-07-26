import { VisitationQuestions } from "@/interfaces/visitation-questions.interface";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity()
export default class VisitationQuestionsEntity
  extends BaseEntity
  implements VisitationQuestions
{
  @PrimaryColumn()
  tg_id: string;

  @PrimaryColumn()
  visitation_id: string;

  @Column({ nullable: true })
  date_logged: string;

  @Column({ nullable: true })
  agreement_flag: number;

  @Column({ nullable: true })
  no_agreement_reason: string;

  @Column({ nullable: true })
  fo_name: string;

  @Column({ nullable: true })
  statement_flag: number;

  @Column({ nullable: true })
  deliver_flag: number;

  @Column({ nullable: true })
  compliance_flag: number;

  @Column({ nullable: true })
  plan_flag: number;

  @Column({ nullable: true })
  frequency: string;

  @Column({ nullable: true })
  frequency_count: string;

  @Column({ nullable: true })
  minimum_amount: string;

  @Column({ nullable: true })
  completion_date: string;

  @Column({ nullable: true })
  next_date: string;

  @Column({ nullable: true })
  next_amount: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  imei: string;

  @Column({ nullable: true })
  app_version: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
