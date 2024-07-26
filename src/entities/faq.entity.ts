import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Faq } from "@interfaces/faq.interface";

@Entity()
export class FaqEntity extends BaseEntity implements Faq {
  @PrimaryColumn()
  faq_id: string;

  @Column()
  faq_config_id: string;

  @Column()
  question: string;

  @Column()
  portfolio_media_id: string;

  @Column()
  additional_info: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
