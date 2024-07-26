import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { DefaultingTg } from "@interfaces/defaulting-tg.interface";

@Entity()
export class DefaultingTgEntity extends BaseEntity implements DefaultingTg {
  @PrimaryColumn()
  tg_id: string;

  @Column({ nullable: true })
  opening_balance: string;

  @Column({ nullable: true })
  program: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  hub: string;

  @Column({ nullable: true })
  defaulting_year: string;

  @Column({ nullable: true })
  risk_level: string;

  @Column({ nullable: true })
  nature: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
