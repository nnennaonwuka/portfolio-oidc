import { IsNotEmpty } from "class-validator";
import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ReceiptDetailsInterface } from "@/interfaces/receipt_details.interface";

@Entity()
export class ReceiptDetailsEntity
  extends BaseEntity
  implements ReceiptDetailsInterface
{
  @PrimaryColumn()
  receipt_id: string;

  @Column({ nullable: true })
  depositor_name: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  ik_number: string;

  @Column({ nullable: true })
  date: Date;

  @Column({ nullable: true })
  amount_paid: string;

  @Column({ nullable: true })
  operator_id: string;

  @Column({ nullable: true })
  bank_name: string;

  @Column({ nullable: true, default: 0 })
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
