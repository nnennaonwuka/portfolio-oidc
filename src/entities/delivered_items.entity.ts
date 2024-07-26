import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import DeliveredItemsInterface from "@/interfaces/delivered_items.interface";

@Entity()
export default class DeliveredItems
  extends BaseEntity
  implements DeliveredItemsInterface
{
  @PrimaryColumn()
  delivered_item_id: string;

  @Column({ nullable: true })
  unique_receiver_id: string;

  @Column({ nullable: true })
  entity_id: string;

  @Column({ nullable: true })
  staff_id: string;

  @Column({ nullable: true })
  ik_number: string;

  @Column({ nullable: true })
  item_id: string;

  @Column({ nullable: true })
  delivery_date: string;

  @Column({ nullable: true })
  app_version: string;

  @Column({ nullable: true })
  imei: string;

  @Column({ nullable: true })
  hub_id: string;

  @Column({ nullable: true })
  item_info: string;

  @Column({ nullable: true })
  item_amount: number;

  @Column({ nullable: true })
  reason: string;

  @Column({ nullable: true })
  sync_flag: number;

  @Column({ nullable: true })
  picture_name: string;

  @Column({ nullable: true })
  delivery_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
