import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { NewMemberDetails } from "@interfaces/new-member-details.interface";

@Entity()
export class NewMemberDetailsEntity
  extends BaseEntity
  implements NewMemberDetails
{
  @PrimaryColumn()
  new_member_details_id: string;

  @Column()
  transfer_id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  dob: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  phone_no: string;

  @Column({ nullable: true })
  ward_id: string;

  @Column({ nullable: true })
  community_id: string;

  @Column({ nullable: true })
  template: string;

  @Column({ nullable: true, default: 0 })
  status: number;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  hub: string;

  @Column({ nullable: true })
  app_version: string;

  @Column({ nullable: true })
  imei: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
