import { IsNotEmpty } from "class-validator";
import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { MeetingConfig } from "@interfaces/meeting-config.interface";

@Entity()
export class MeetingConfigEntity extends BaseEntity implements MeetingConfig {
  @PrimaryColumn()
  meeting_config_id: string;

  @Column()
  @IsNotEmpty()
  type: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  min_size: number;

  @Column()
  @IsNotEmpty()
  max_size: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
