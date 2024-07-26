import { VisitationInformation } from "@/interfaces/visitation-information.interface";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity()
export default class VisitationInformationEntity
  extends BaseEntity
  implements VisitationInformation
{
  @PrimaryColumn()
  visitation_id: string;

  @Column({ nullable: true })
  tg_id: string;

  @Column({ nullable: true })
  date_logged: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  presence_flag: number;

  @Column({ nullable: true })
  member_verified_flag: number;

  @Column({ nullable: true })
  app_version: string;

  @Column({ nullable: true })
  imei: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column({ nullable: true })
  image_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
