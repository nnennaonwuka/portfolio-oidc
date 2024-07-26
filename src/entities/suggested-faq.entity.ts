import { IsNotEmpty } from "class-validator";
import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { SuggestedFaq } from "@interfaces/suggested-faq.interface";

@Entity()
export class SuggestedFaqEntity extends BaseEntity implements SuggestedFaq {
  @PrimaryColumn()
  suggested_faq_id: string;

  @Column()
  @IsNotEmpty()
  question: string;

  @Column()
  @IsNotEmpty()
  meeting_log_id: string;

  @Column()
  @IsNotEmpty()
  staff_id: string;

  @Column()
  @IsNotEmpty()
  app_version: string;

  @Column()
  @IsNotEmpty()
  imei: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
