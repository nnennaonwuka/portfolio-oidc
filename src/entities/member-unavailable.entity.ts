import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { MemberUnavailable } from "@interfaces/member-unavailable.interface";

@Entity()
export class MemberUnavailableEntity
  extends BaseEntity
  implements MemberUnavailable
{
  @PrimaryColumn()
  member_unavailable_id: string;

  @Column({ nullable: true })
  meeting_log_id: string;

  @Column({ nullable: true })
  unique_member_id: string;

  @Column({ nullable: true })
  ik_number: string;

  @Column({ nullable: true })
  reason: string;

  @Column({ nullable: true })
  rf_id: string;

  @Column({ nullable: true })
  transfer_id: string;

  @Column({ nullable: true })
  date_logged: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  app_version: string;

  @Column({ nullable: true })
  imei: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
