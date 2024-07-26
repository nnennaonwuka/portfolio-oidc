import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { PaymentClaimsInterface } from "@/interfaces/payment-claims.interface";
@Entity()
export class PaymentClaimsEntity
  extends BaseEntity
  implements PaymentClaimsInterface
{
  @PrimaryColumn()
  payment_claim_id: string;

  @Column({ nullable: true })
  ik_number: string;

  @Column({ nullable: true })
  unique_member_id: string;

  @Column({ nullable: true })
  account_name: string;

  @Column({ nullable: true })
  amount_deposited: string;

  @Column({ nullable: true })
  date_of_deposit: string;

  @Column({ nullable: true })
  time_of_deposit: string;

  @Column({ nullable: true })
  agent_name: string;

  @Column({ nullable: true })
  pos_bank_community: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  imei: string;

  @Column({ nullable: true })
  app_version: string;

  @Column({ nullable: true })
  delete_flag: number;

  @Column({ nullable: true })
  operator_id: string;

  @Column({ nullable: true, default: 0 })
  status: number;

  @Column({ nullable: true })
  depositor_name: string;

  @Column({ nullable: true })
  hub_id: string;

  @Column({ nullable: true })
  delete_date: string;

  @Column({ nullable: true })
  delete_comment: string;

  @Column({ nullable: true })
  receipt_image: string;

  @Column({ nullable: true })
  pos_bank_lga: string;

  @Column({ nullable: true })
  pos_bank_ward: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
