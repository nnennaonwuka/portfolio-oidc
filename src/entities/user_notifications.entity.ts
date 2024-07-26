
import { UserNotifications } from "@/interfaces/user_notifications";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class UserNotificationsEntity
  extends BaseEntity
  implements UserNotifications
  {
  @PrimaryColumn()
  staff_id: string;

  @Column({ nullable: true })
  notification_id: string;

  @Column({ nullable: true })
  is_read: number;

  @Column({ nullable: true })
  is_cleared: number;

  @Column({ nullable: true })
  read_at: string;

  @Column({ nullable: true })
  cleared_at: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
