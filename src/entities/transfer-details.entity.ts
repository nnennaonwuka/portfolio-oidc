import { TransferDetails } from "@/interfaces/transfer-details.interface";
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
export default class TransferDetailsEntity
  extends BaseEntity
  implements TransferDetails
{
  @PrimaryColumn()
  tg_id: string;

  @PrimaryColumn()
  date_logged: string;

  @Column({ nullable: true })
  amount: string;

  @Column({ nullable: true })
  sender_name: string;

  @Column({ nullable: true })
  transfer_date: string;

  @Column({ nullable: true })
  receipt_id: string;

  @Column({ nullable: true })
  narration: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  imei: string;

  @Column({ nullable: true })
  app_version: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ enum: PAYMENT_STATUS, default: PAYMENT_STATUS.PENDING })
  payment_status: PAYMENT_STATUS;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
