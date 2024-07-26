import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { SocialCallLog } from "@interfaces/social-call-log.interface";

@Entity()
export class SocialCallLogEntity extends BaseEntity implements SocialCallLog {
  @PrimaryColumn()
  social_log_id: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  activity_log_id: string;

  @Column({ nullable: true })
  unique_member_id: string;

  @Column({ nullable: true })
  ik_number: string;

  @Column({ nullable: true })
  date_logged: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  operator_id: string;

  @Column({ nullable: true })
  app_version: string;

  @Column({ nullable: true })
  imei: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
