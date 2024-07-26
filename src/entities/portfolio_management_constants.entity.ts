import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";
import PortfolioManagementConstants from "@/interfaces/portfolio_management_constants.interface";

@Entity({ name: "portfolio_management_constants" })
export default class PortfolioManagementConstantsEntity
  extends BaseEntity
  implements PortfolioManagementConstants
{
  @PrimaryColumn()
  key: string;

  @Column()
  value: string;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @Index("portfolio_management_constants_updated_at_index")
  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
