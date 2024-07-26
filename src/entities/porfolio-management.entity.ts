import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { PortfolioManagement } from "@/interfaces/portfolio-management.interface";

@Entity()
export class PortfolioManagementAssignmentEntity
  extends BaseEntity
  implements PortfolioManagement
{
  @PrimaryColumn()
  ik_number: string;

  @Column({ nullable: true })
  hub: string;

  @Column({ nullable: true })
  hub_classification: string;

  @Column({ nullable: true })
  program: string;

  @Column({ nullable: true })
  pco: string;

  @Column({ nullable: true })
  pcs: string;

  @Column({ nullable: true })
  mik: string;

  @Column({ nullable: true })
  mik_seed: string;

  @Column({ nullable: true })
  lmik: string;

  @Column({ nullable: true })
  lmik_seed: string;

  @Column({ nullable: true })
  msb: string;

  @Column({ nullable: true })
  bgt: string;

  @Column({ nullable: true })
  bgt_seed: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
