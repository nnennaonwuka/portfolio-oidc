import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { DepositsInterface } from "@/interfaces/deposits.interface";

@Entity()
export class DepositsEntity extends BaseEntity implements DepositsInterface {
  @PrimaryColumn()
  deposit_id: string;

  @Column({ nullable: true })
  date_of_deposit: string;

  @Column({ nullable: true })
  bank_name: string;

  @Column({ nullable: true })
  amount_deposited: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  imei: string;

  @Column({ nullable: true })
  app_version: string;

  @Column({ nullable: true })
  account_number: string;

  @Column({ nullable: true })
  receipt_id: string;

  @Column({ nullable: true })
  depositor: string;

  @Column({ nullable: true })
  time_of_deposit: string;

  @Column({ nullable: true, default: 0 })
  status: number;

  @Column({ nullable: true })
  hub_id: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  status_updated_date: string;

  @Column({ nullable: true })
  reference_deposit_id: string;

  @Column({ nullable: true })
  payment_details_id: string;

  @Column({ nullable: true })
  image_id: string;

  @Column({ nullable: true })
  payment_mode: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
