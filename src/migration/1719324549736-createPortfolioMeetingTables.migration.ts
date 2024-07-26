import {MigrationInterface, QueryRunner} from "typeorm";

export class createPortfolioMeetingTables1719324549736 implements MigrationInterface {
    name = 'createPortfolioMeetingTables1719324549736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meeting_attendees_entity" ("attendee_id" character varying NOT NULL, "meeting_id" character varying, "first_name" character varying, "last_name" character varying, "staff_id" character varying, "sub_phase_activity" character varying, "sub_phase_flag" character varying, "check_in_time" character varying, "check_out_time" character varying, "duration" character varying, "imei" character varying, "app_version" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3cc1601dc130f29913f8618cc8e" PRIMARY KEY ("attendee_id"))`);
        await queryRunner.query(`CREATE TABLE "operator_performance_entity" ("operator_id" character varying NOT NULL, "staff_id" character varying, "first_name" character varying, "last_name" character varying, "least_performing_activity" character varying, "percentage" character varying, "hub_id" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2d3bd019b8fa671fc9ebbf156dc" PRIMARY KEY ("operator_id"))`);
        await queryRunner.query(`CREATE TABLE "meetings_entity" ("meeting_id" character varying NOT NULL, "meeting_address" character varying, "meeting_name" character varying, "staff_id" character varying, "community" character varying, "state" character varying, "lga" character varying, "meeting_date" character varying, "room_image" character varying, "longitude" character varying, "lattitude" character varying, "check_in_count" integer NOT NULL DEFAULT '0', "check_out_count" integer NOT NULL DEFAULT '0', "training_material" character varying, "meeting_start_time" character varying, "meeting_end_time" character varying, "imei" character varying, "app_version" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_51de1332f9ca20f58452b3d6e0d" PRIMARY KEY ("meeting_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "meetings_entity"`);
        await queryRunner.query(`DROP TABLE "operator_performance_entity"`);
        await queryRunner.query(`DROP TABLE "meeting_attendees_entity"`);
    }

}
