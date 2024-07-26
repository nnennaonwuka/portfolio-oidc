import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { MemberCollectionCenterUpdate } from "@interfaces/member-collection-center-update.interface";

@Entity()
export class MemberCollectionCenterUpdateEntity
  extends BaseEntity
  implements MemberCollectionCenterUpdate
{
  @PrimaryColumn()
  unique_member_id: string;

  @Column()
  ik_number: string;

  @Column()
  collection_center_id: string;

  @Column()
  imei: string;

  @Column()
  staff_id: string;

  @Column()
  app_version: string;

  @Column({ nullable: true })
  field_id: string;

  @Column({ nullable: true })
  approved_status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
