import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { PaymentTracker } from "@interfaces/payment-tracker.interface";

@Entity()
export class PaymentTrackerEntity extends BaseEntity implements PaymentTracker {
  @PrimaryColumn()
  tracker_id: string;

  @Column({ nullable: true })
  tg_id: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  deactivate_flag: number;

  @Column({ nullable: true })
  member_verified_flag: number;

  @Column({ nullable: true })
  app_version: string;

  @Column({ nullable: true })
  imei: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column({ nullable: true })
  image_name: string;

  @Column({ nullable: true })
  community_flag: number;

  @Column({ nullable: true, default: 0 })
  payment_plan_flag: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
