import {MigrationInterface, QueryRunner} from "typeorm";

export class createMeetingRoomsTableAndUpdateMeetings1720204289463 implements MigrationInterface {
    name = 'createMeetingRoomsTableAndUpdateMeetings1720204289463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "meeting_rooms_entity" ("room_id" character varying NOT NULL, "room_address" character varying, "date_created" character varying, "staff_id" character varying, "community" character varying, "state" character varying, "lga" character varying, "ward" character varying, "hub_id" character varying, "room_image" character varying, "longitude" character varying, "lattitude" character varying, "delete_flag" integer NOT NULL DEFAULT '0', "type" character varying, "imei" character varying, "app_version" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_822468fe4883c231362718d9a84" PRIMARY KEY ("room_id"))`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" DROP COLUMN "meeting_date"`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" DROP COLUMN "lga"`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" DROP COLUMN "room_image"`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" DROP COLUMN "meeting_address"`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" DROP COLUMN "lattitude"`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" DROP COLUMN "community"`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" DROP COLUMN "ward"`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" ADD "meeting_type" character varying`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" ADD "date_scheduled" character varying`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" ADD "room_id" character varying`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" ADD "hub_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings_entity" DROP COLUMN "hub_id"`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" DROP COLUMN "room_id"`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" DROP COLUMN "date_scheduled"`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" DROP COLUMN "meeting_type"`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" ADD "ward" character varying`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" ADD "community" character varying`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" ADD "lattitude" character varying`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" ADD "longitude" character varying`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" ADD "meeting_address" character varying`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" ADD "room_image" character varying`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" ADD "lga" character varying`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" ADD "meeting_date" character varying`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" ADD "state" character varying`);
        await queryRunner.query(`DROP TABLE "meeting_rooms_entity"`);
    }

}
