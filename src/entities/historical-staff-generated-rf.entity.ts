import { IsNotEmpty } from "class-validator";
import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { StaffGeneratedRf } from "@interfaces/staff-generated-rf.interface";

@Entity()
export class HistoricalStaffGeneratedRfEntity
  extends BaseEntity
  implements StaffGeneratedRf
{
  @PrimaryGeneratedColumn("uuid" )
  rf_id: string;

  @Column()
  @IsNotEmpty()
  rf_type: string;

  @Column({ nullable: true })
  rf_status: number;

  @Column({ nullable: true })
  staff_id_created: string;

  @Column({ nullable: true })
  staff_id_solved: string;

  @Column({ nullable: true })
  staff_id_verified: string;

  @Column({ nullable: true })
  hub_id: string;

  @Column({ nullable: true })
  red_flagged_staff_id: string;

  @Column({ nullable: true })
  reopen_flag: number;

  @Column({ nullable: true })
  date_logged: string;

  @Column({ nullable: true })
  date_solved: string;

  @Column({ nullable: true })
  date_verified: string;

  @Column({ nullable: true })
  comment_created: string;

  @Column({ nullable: true })
  comment_solved: string;

  @Column({ nullable: true })
  comment_verified: string;

  @Column({ nullable: true })
  entity_id: string;

  @Column({ nullable: true })
  image_name: string;

  @Column({ nullable: true })
  system_risk_level: string;

  @Column({ nullable: true })
  user_risk_level: string;

  @Column({ nullable: true })
  presence_flag: string;

  @Column({ nullable: true })
  app_version: string;

  @Column({ nullable: true })
  imei: string;

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

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  insert_date: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
