
import { Notifications } from "@/interfaces/notifications.interface";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class NotificationsEntity
  extends BaseEntity
  implements Notifications
{
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  type: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
