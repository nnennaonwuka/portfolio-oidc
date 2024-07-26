import { DefaultRfLog } from "@/interfaces/deafualt_rf_log.interface";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity()
export default class DefaultRfLogEntity
  extends BaseEntity
  implements DefaultRfLog
{
  @PrimaryColumn()
  tg_id: string;

  @PrimaryColumn()
  rf_type: string;

  @PrimaryColumn()
  date_logged: string;

  @Column({ nullable: true })
  date_solved: string;

  @Column({ nullable: true })
  rf_status: number;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  contact_method: string;

  @Column({ nullable: true })
  contact_person: string;

  @Column({ nullable: true })
  staff_id_solved: string;

  @Column({ nullable: true })
  imei: string;

  @Column({ nullable: true })
  app_version: string;

  @Column({ nullable: true })
  rf_id: string;

  @Column({ nullable: true })
  hub_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
