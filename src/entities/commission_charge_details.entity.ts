import { CommissionChargeDetails } from "@/interfaces/commission_charge_details.interface";

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class CommissionChargeDetailsEntity
  extends BaseEntity
  implements CommissionChargeDetails
{
  @PrimaryColumn()
  tg_id: string;

  @Column({ nullable: true })
  date_logged: string;

  @Column({ nullable: true })
  amount: string;

  @Column({ nullable: true })
  commission_charge: string;

  @Column({ nullable: true })
  image_name: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  imei: string;

  @Column({ nullable: true })
  app_version: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
