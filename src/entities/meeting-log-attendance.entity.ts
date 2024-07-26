import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { MeetingLogAttendance } from "@interfaces/meeting-log-attendance.interface";

@Entity()
export class MeetingLogAttendanceEntity
  extends BaseEntity
  implements MeetingLogAttendance
{
  @PrimaryColumn()
  meeting_log_id: string;

  @PrimaryColumn()
  unique_member_id: string;

  @Column({ nullable: true })
  ik_number: string;

  @Column({ nullable: true })
  date_joined: string;

  @Column({ nullable: true })
  verification_flag: number;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  operator_id: string;

  @Column({ nullable: true })
  app_version: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
