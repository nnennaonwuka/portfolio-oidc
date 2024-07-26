import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Transfer } from "../interfaces/transfer.interface";

@Entity()
export class TransferEntity extends BaseEntity implements Transfer {
  @PrimaryColumn()
  transfer_id: string;

  @Column({ nullable: true })
  meeting_log_id: string;

  @Column({ nullable: true })
  transfer_type: string;

  @Column({ nullable: true })
  unique_member_id: string;

  @Column({ nullable: true })
  ik_number: string;

  @Column({ nullable: true })
  new_unique_member_id: string;

  @Column({ nullable: true })
  new_ik_number: string;

  @Column({ nullable: true, default: 0 })
  transfer_status: number;

  @Column({ nullable: true })
  new_member_details_id: string;

  @Column({ nullable: true })
  date_logged: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  hub: string;

  @Column({ nullable: true })
  app_version: string;

  @Column({ nullable: true })
  imei: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
