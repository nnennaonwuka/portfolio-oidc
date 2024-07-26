import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { MeetingLog } from "@interfaces/meeting-log.interface";

@Entity()
export class MeetingLogEntity extends BaseEntity implements MeetingLog {
  @PrimaryColumn()
  meeting_log_id: string;

  @Column({ nullable: true })
  meeting_config_id: string;

  @Column({ nullable: true })
  start_date: string;

  @Column({ nullable: true })
  end_date: string;

  @Column({ nullable: true })
  duration: string;

  @Column({ nullable: true })
  no_of_attendees: number;

  @Column({ type: "integer", default: 0 })
  meeting_status: number;

  @Column({ nullable: true })
  failure_reason: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  operator_id: string;

  @Column({ nullable: true })
  imei: string;

  @Column({ nullable: true })
  app_version: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
