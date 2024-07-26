import { SelfDepositDetails } from "@/interfaces/self-deposit-details.interface";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

enum PAYMENT_STATUS {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  DECLINED = "DECLINED",
}

@Entity()
export default class SelfDepositDetailsEntity
  extends BaseEntity
  implements SelfDepositDetails
{
  @PrimaryColumn()
  tg_id: string;

  @PrimaryColumn()
  date_logged: string;

  @Column({ nullable: true })
  depositor_name: string;

  @Column({ nullable: true })
  deposit_date: string;

  @Column({ nullable: true })
  amount: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column({ nullable: true })
  bank_name: string;

  @Column({ nullable: true })
  bank_community: string;

  @Column({ nullable: true })
  bank_ward: string;

  @Column({ nullable: true })
  receipt_id: string;

  @Column({ nullable: true })
  pos_receipt_id: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  imei: string;

  @Column({ nullable: true })
  app_version: string;

  @Column({ nullable: true })
  bank_lga: string;

  @Column({ enum: PAYMENT_STATUS, default: PAYMENT_STATUS.PENDING })
  payment_status: PAYMENT_STATUS;

  @Column({ nullable: true })
  receipt_url: string;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
