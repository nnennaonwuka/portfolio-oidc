import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { FaqConfig } from "@interfaces/faq-config.interface";

@Entity()
export class FaqConfigEntity extends BaseEntity implements FaqConfig {
  @PrimaryColumn()
  faq_config_id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
