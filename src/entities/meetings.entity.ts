import {
    BaseEntity,
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
import { Meetings } from "@/interfaces/meetings.interface";
import { MEETING_TYPE } from "../enums/meeting_type.enum";
  
  @Entity()
  export class MeetingsEntity extends BaseEntity implements Meetings {
    @PrimaryColumn()
    meeting_id: string;
    
    @Column({ nullable: true })
    meeting_name: string;
  
    @Column({ nullable: true })
    staff_id: string;
  
    @Column({enum: MEETING_TYPE, nullable: true, default:MEETING_TYPE.UNSCHEDULED })
    meeting_type: string;
  
    @Column({ nullable: true })
    date_scheduled: string;
  
    @Column({ nullable: true })
    room_id: string;

    @Column({ nullable: true })
    hub_id: string;
  
    @Column({ type: "integer", default: 0 })
    check_in_count: number;
  
    @Column({type: "integer", default: 0 })
    check_out_count: number;
  
    @Column({ nullable: true })
    training_material: string;

    @Column({ nullable: true })
    meeting_start_time: string;

    @Column({ nullable: true })
    meeting_end_time: string;
  
    @Column({ nullable: true })
    imei: string;
  
    @Column({ nullable: true })
    app_version: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  