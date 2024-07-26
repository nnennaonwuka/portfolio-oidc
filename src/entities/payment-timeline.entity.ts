import { PaymentTimeline } from "@/interfaces/payment-timeline.interface";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class PaymentTimelineEntity
  extends BaseEntity
  implements PaymentTimeline
{
  @PrimaryColumn()
  tg_id: string;

  @PrimaryColumn()
  date_logged: string;

  @Column({ nullable: true })
  reference_id: string;

  @Column({ nullable: true })
  delivery_flag: number;

  @Column({ nullable: true })
  payment_flag: number;

  @Column({ nullable: true })
  debt_flag: number;

  @Column({ nullable: true })
  plan_flag: number;

  @Column({ nullable: true })
  frequency: string;

  @Column({ nullable: true })
  frequency_count: string;

  @Column({ nullable: true })
  minimum_amount: string;

  @Column({ nullable: true })
  completion_date: string;

  @Column({ nullable: true })
  next_date: string;

  @Column({ nullable: true })
  next_amount: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  imei: string;

  @Column({ nullable: true })
  app_version: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
