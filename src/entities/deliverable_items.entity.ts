import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import DeliverableItemsInterface from "@/interfaces/deliverable_items.interface";

@Entity()
export default class DeliverableItems
  extends BaseEntity
  implements DeliverableItemsInterface
{
  @PrimaryColumn()
  item_id: string;

  @Column({ nullable: true })
  item_name: string;

  @Column({ nullable: true })
  max_number: number;

  @Column({ nullable: true })
  entered_item_info: string;

  @Column({ nullable: true })
  qr_flag: number;

  @Column({ nullable: true })
  qr_regex: string;

  @Column({ nullable: true })
  reason_list: string;

  @Column({ nullable: true })
  visible_entity_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
