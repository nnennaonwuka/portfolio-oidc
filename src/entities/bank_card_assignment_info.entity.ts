import BankCardAssignmentInfoInterface from "@/interfaces/bank_card_assignment_info.interface";
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
export default class BankCardAssignmentInfo
  extends BaseEntity
  implements BankCardAssignmentInfoInterface
{
  @PrimaryColumn()
  bank_card_id: string;

  @PrimaryColumn()
  unique_entity_id: string;

  @Column({ nullable: true })
  entity_id: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  pan: string;

  @Column({ nullable: true })
  expiry_date: string;

  @Column({ nullable: true })
  assigned_date: string;

  @Column({ nullable: true })
  ik_number: string;

  @Column({ nullable: true })
  bg_card_number: string;

  @Column({ nullable: true })
  app_version: string;

  @Column({ nullable: true })
  imei: string;

  @Column({ nullable: true })
  leader_presence_flag: string;

  @Column({ default: "1" })
  status: string;

  @Column({ nullable: true })
  item_info: string;

  @Column({ nullable: true })
  item_id: string;

  @Column({ nullable: true })
  card_image: string;

  @Column({ nullable: true })
  card_holder_image: string;

  @Column({ nullable: true })
  replacement_reason: string;

  @Column({ nullable: true })
  portal_card_status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
