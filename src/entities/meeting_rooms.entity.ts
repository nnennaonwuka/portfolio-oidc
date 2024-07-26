import {
    BaseEntity,
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
import { MeetingRooms } from "@/interfaces/meeting_rooms.interface";
  
  @Entity()
  export class MeetingRoomsEntity extends BaseEntity implements MeetingRooms {
    @PrimaryColumn()
    room_id: string;
  
    @Column({ nullable: true })
    room_address: string;
  
    @Column({ nullable: true })
    date_created: string;
  
    @Column({ nullable: true })
    staff_id: string;
  
    @Column({ nullable: true })
    community: string;
  
    @Column({ nullable: true })
    state: string;
  
    @Column({ nullable: true })
    lga: string;

    @Column({ nullable: true })
    ward: string;
  
    @Column({ nullable: true })
    hub_id: string;
  
    @Column({ nullable: true })
    room_image: string;
  
    @Column({ nullable: true })
    longitude: string;

    @Column({ nullable: true })
    lattitude: string;
  
    @Column({ type: "integer", default: 0 })
    delete_flag: number;
    
    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    imei: string;
  
    @Column({ nullable: true })
    app_version: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  