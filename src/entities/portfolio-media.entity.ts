import { IsNotEmpty } from "class-validator";
import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { PortfolioMedia } from "@interfaces/portfolio-media.interface";

@Entity()
export class PortfolioMediaEntity extends BaseEntity implements PortfolioMedia {
  @PrimaryColumn()
  portfolio_media_id: string;

  @Column()
  @IsNotEmpty()
  topic: string;

  @Column()
  @IsNotEmpty()
  file_names: string;

  @Column({ nullable: true })
  due_date: string;

  @Column()
  @IsNotEmpty()
  length: string;

  @Column()
  @IsNotEmpty()
  languages: string;

  @Column({ nullable: true })
  additional_info: string;

  @Column()
  @IsNotEmpty()
  meeting_config_id: string;

  @Column({ nullable: true })
  priority_level: string;

  @Column({ nullable: true })
  risk_level: string;

  @Column({ nullable: true })
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
