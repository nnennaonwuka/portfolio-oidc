
import BankCardVerification from "@/interfaces/bank_card_verification.interface";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class BankCardVerificationEntity
  extends BaseEntity
  implements BankCardVerification
{
  @PrimaryColumn()
  verification_id: string;

  @Column({ nullable: true })
  bg_card_id: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  ik_number: string;

  @Column({ nullable: true })
  gotten_ms_card_number: string;

  @Column({ nullable: true })
  gotten_pco_card_number: string;

  @Column({ nullable: true })
  expected_bg_card_number: string;

  @Column({ nullable: true })
  status: number;

  @Column({ nullable: true })
  error_id: string;

  @Column({ nullable: true })
  error_log_date: string;
  
  @Column({ nullable: true })
  card_holder_image_pco: string;

  @Column({ nullable: true })
  card_image_pco: string;

  @Column({ nullable: true })
  pan_pco: string;

  @Column({ nullable: true })
  error_message: string;

  @Column({ nullable: true })
  ms_staff_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
