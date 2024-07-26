import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { WalletDetailsInterface } from "@/interfaces/wallet-details.interface";

@Entity()
export class WalletDetailsEntity
  extends BaseEntity
  implements WalletDetailsInterface
{
  @PrimaryColumn()
  unique_entity_id: string;

  @Column({ nullable: true })
  account_name: string;

  @Column({ nullable: true })
  account_number: string;

  @Column({ nullable: true })
  bank_name: string;

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  entity_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
