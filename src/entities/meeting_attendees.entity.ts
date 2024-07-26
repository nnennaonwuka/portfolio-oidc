import {
    BaseEntity,
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
import { MeetingAttendees } from "@/interfaces/meeting_attendees.interface";
  
  @Entity()
  export class MeetingAttendeesEntity extends BaseEntity implements MeetingAttendees {
    @PrimaryColumn()
    attendee_id: string;
  
    @Column({ nullable: true })
    meeting_id: string;
  
    @Column({ nullable: true })
    first_name: string;
  
    @Column({ nullable: true })
    last_name: string;
  
    @Column({ nullable: true })
    staff_id: string;
  
    @Column({ nullable: true })
    sub_phase_activity: string;
  
    @Column({ type: "integer", default: 0 })
    sub_phase_flag: number;
  
    @Column({ nullable: true })
    check_in_time: string;
  
    @Column({ nullable: true })
    check_out_time: string;
  
    @Column({ nullable: true })
    duration: string;

    @Column({ nullable: true })
    hub_id: string;

    @Column({ nullable: true })
    imei: string;
  
    @Column({ nullable: true })
    app_version: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  