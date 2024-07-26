import { PaymentDetails } from "@/interfaces/payment_details.interface";

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class PaymentDetailsEntity
  extends BaseEntity
  implements PaymentDetails
{
  @PrimaryColumn()
  payment_details_id: string;

  @Column({ nullable: true })
  depositor_name: string;

  @Column({ nullable: true })
  deposit_date: string;

  @Column({ nullable: true })
  tg_id: string;

  @Column({ nullable: true })
  mode_of_payment: string;

  @Column({ nullable: true })
  amount: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column({ nullable: true })
  date_logged: string;

  @Column({ nullable: true })
  bank_name: string;

  @Column({ nullable: true })
  bank_community_id: string;

  @Column({ nullable: true })
  bank_ward_id: string;

  @Column({ nullable: true })
  transaction_charges: string;

  @Column({ nullable: true })
  transaction_receipt_id: string;

  @Column({ nullable: true })
  company_receipt_id: string;

  @Column({ nullable: true })
  payment_transaction_id: string;

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

  @Column({ nullable: true })
  sync_flag: number;

  @Column({ nullable: true })
  bank_lga_id: string;

  @Column({ nullable: true })
  payment_status: string;

  @Column({ nullable: true })
  delete_status: number;

  @Column({ nullable: true })
  reason_for_deletion: string;

  @Column({ nullable: true })
  delete_date: string;

  @Column({ nullable: true })
  transaction_receipt_image: string;

  @Column({ nullable: true })
  pcs_logged_flag: number;

  @Column({ nullable: true })
  pcs_id: string;
}
