import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ConfirmedDepositsInterface } from "@/interfaces/confirmed_deposits.interface";

@Entity()
export class ConfirmedDepositsEntity
  extends BaseEntity
  implements ConfirmedDepositsInterface
{
  @PrimaryColumn()
  deposit_id: string;

  @Column({ nullable: true })
  operator_id: string;

  @Column({ nullable: true })
  payment_claim_id: string;

  @Column({ nullable: true })
  bank_name: string;

  @Column({ nullable: true })
  date_of_confirmation: string;

  @Column({ nullable: true })
  ik_number: string;

  @Column({ nullable: true })
  amount_deposited: string;

  @Column({ nullable: true })
  app_version: string;

  @Column({ nullable: true })
  hub_id: string;

  @Column({ nullable: true })
  imei: string;

  @Column({ nullable: true })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
