import {
    BaseEntity,
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  import { OperatorPerformance } from "@/interfaces/operator_performance.interface";
  
  @Entity()
  export class OperatorPerformanceEntity extends BaseEntity implements OperatorPerformance {
    @PrimaryColumn()
    operator_id: string;
  
    @Column({ nullable: true })
    staff_id: string;
  
    @Column({ nullable: true })
    first_name: string;
  
    @Column({ nullable: true })
    last_name: string;
  
    @Column({ nullable: true })
    least_performing_activity: string;
  
    @Column({ nullable: true })
    percentage: string;
  
    @Column({ nullable: true })
    hub_id: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  