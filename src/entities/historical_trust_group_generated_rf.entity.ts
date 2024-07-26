import { TrustGroupGeneratedRf } from "@/interfaces/trust_group_generated_rf.interface";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class HistoricalTrustGroupGeneratedRfEntity
  extends BaseEntity
  implements TrustGroupGeneratedRf
{
  @PrimaryGeneratedColumn("uuid")
  rf_id: string;

  @Column({ nullable: true })
  rf_type: string;

  @Column({ nullable: true })
  rf_status: number;

  @Column({ nullable: true })
  staff_id_created: string;

  @Column({ nullable: true })
  staff_id_solved: string;

  @Column({ nullable: true })
  staff_id_updated: string;

  @Column({ nullable: true })
  hub_id: string;

  @Column({ nullable: true })
  ik_number: string;

  @Column({ nullable: true })
  reopen_flag: number;

  @Column({ nullable: true })
  contact_person: string;

  @Column({ nullable: true })
  contact_method: string;

  @Column({ nullable: true })
  date_logged: string;

  @Column({ nullable: true })
  date_solved: string;

  @Column({ nullable: true })
  date_updated: string;

  @Column({ nullable: true })
  comment_created: string;

  @Column({ nullable: true })
  comment_solved: string;

  @Column({ nullable: true })
  comment_updated: string;

  @Column({ nullable: true })
  app_version: string;

  @Column({ nullable: true })
  imei: string;

  @Column({ nullable: true })
  system_risk_level: string;

  @Column({ nullable: true })
  user_risk_level: string;

  @Column({ nullable: true })
  log_entity_id: string;

  @Column({ nullable: true })
  solve_entity_id: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  solve_method: string;

  @Column({ nullable: true })
  red_flag_id: string;

  @Column({ nullable: true })
  presence_flag: string;

  @CreateDateColumn()
  create_at: Date;

  @CreateDateColumn()
  insert_date: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
