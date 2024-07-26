import { IsNotEmpty } from "class-validator";
import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { MemberEdit } from "@interfaces/member-edit.interface";

@Entity()
export class MemberEditEntity extends BaseEntity implements MemberEdit {
  @PrimaryColumn()
  unique_member_id: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  phone_no: string;

  @Column()
  @IsNotEmpty()
  ward_id: string;

  @Column()
  @IsNotEmpty()
  community_id: string;

  @Column()
  @IsNotEmpty()
  date_logged: string;

  @Column()
  @IsNotEmpty()
  staff_id: string;

  @Column({ nullable: true })
  hub: string;

  @Column({ nullable: true })
  app_version: string;

  @Column({ nullable: true })
  imei: string;

  @Column({ nullable: true })
  approved_status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
