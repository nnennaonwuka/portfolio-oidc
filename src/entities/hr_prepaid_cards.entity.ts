import { HrPrepaidCards } from "@/interfaces/hr_prepaid_cards.interface";
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
export default class HrPrepaidCardsEntity
  extends BaseEntity
  implements HrPrepaidCards
{
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  account_no: string;

  @Column({ nullable: true })
  name_on_card: string;

  @Column({ nullable: true })
  product_code: string;

  @Column({ nullable: true })
  branch_no: string;

  @Column({ nullable: true })
  card_number: string;

  @Column({ nullable: true })
  modified_card_number: string;

  @Column({ nullable: true })
  pan: string;

  @Column({ default: 0 })
  card_assignment_flag: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
