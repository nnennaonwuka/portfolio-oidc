import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ActivityLog } from "@interfaces/activity-log.interface";

@Entity()
export class ActivityLogEntity extends BaseEntity implements ActivityLog {
  @PrimaryColumn()
  activity_log_id: string;

  @Column({ nullable: true })
  meeting_log_id: string;

  @Column({ nullable: true })
  unique_member_id: string;

  @Column({ nullable: true })
  ik_number: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  sub_activity_log_id: string;

  @Column()
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
