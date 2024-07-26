import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { KnowledgeLog } from "@interfaces/knowledge-log.interface";

@Entity()
export class KnowledgeLogEntity extends BaseEntity implements KnowledgeLog {
  @PrimaryColumn()
  knowledge_log_id: string;

  @Column({ nullable: true })
  portfolio_media_id: string;

  @Column({ nullable: true })
  unique_member_id: string;

  @Column({ nullable: true })
  ik_number: string;

  @Column({ nullable: true })
  topic: string;

  @Column({ nullable: true })
  activity_log_id: string;

  @Column({ nullable: true })
  language: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  operator_id: string;

  @Column({ nullable: true })
  imei: string;

  @Column({ nullable: true })
  app_version: string;

  @Column({ nullable: true })
  date_logged: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
