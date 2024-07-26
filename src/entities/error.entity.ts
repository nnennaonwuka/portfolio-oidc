
import BankCardVerification from "@/interfaces/bank_card_verification.interface";
import { ErrorInterface } from "@/interfaces/error.interface";
import { error } from 'console';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class ErrorEntity
  extends BaseEntity
  implements ErrorInterface
{
  @PrimaryColumn()
  error_id: number;

  @Column({ nullable: true })
  error_message: string;

  @Column({ nullable: true })
  error_type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
