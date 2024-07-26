import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { PaymentTransactions } from "@interfaces/payment-transactions.interface";

@Entity()
export class PaymentTransactionsEntity
  extends BaseEntity
  implements PaymentTransactions
{
  @PrimaryColumn()
  payment_transaction_id: string;

  @Column({ nullable: true })
  tracker_id: string;

  @Column({ nullable: true })
  receipt_id: string;

  @Column({ nullable: true })
  tg_id: string;

  @Column({ nullable: true })
  amount: string;

  @Column({ nullable: true })
  receiver_name: string;

  @Column({ nullable: true })
  payment_method: string;

  @Column({ nullable: true })
  member_verified_flag: number;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  app_version: string;

  @Column({ nullable: true })
  imei: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  date: string;

  @Column({ nullable: true })
  corrected_balance: string;

  @Column({ nullable: true, default: 0 })
  balance_error_flag: number;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  cash_deposit_flag: number;

  @Column({ nullable: true })
  in_community_flag: number;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column({ nullable: true })
  pcs_logged_flag: number;

  @Column({ nullable: true })
  pcs_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
