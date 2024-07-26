import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ReferenceDepositsInterface } from "@/interfaces/reference-deposits.interface";

@Entity()
export class ReferenceDepositsEntity
  extends BaseEntity
  implements ReferenceDepositsInterface
{
  @PrimaryColumn()
  reference_deposit_id: string;

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

  @Column({ nullable: true })
  status: number;

  @Column({ nullable: true })
  hub_id: string;

  @Column({ nullable: true })
  rejection_comment: string;

  @Column({ nullable: true })
  rejection_date: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
