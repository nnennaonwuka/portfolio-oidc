import {MigrationInterface, QueryRunner} from "typeorm";

export class updatePortfolioMeetingTables1720614293644 implements MigrationInterface {
    name = 'updatePortfolioMeetingTables1720614293644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting_attendees_entity" ADD "hub_id" character varying`);
        await queryRunner.query(`ALTER TABLE "meeting_attendees_entity" DROP COLUMN "sub_phase_flag"`);
        await queryRunner.query(`ALTER TABLE "meeting_attendees_entity" ADD "sub_phase_flag" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "meetings_entity" ALTER COLUMN "meeting_type" SET DEFAULT 'UNSCHEDULED'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings_entity" ALTER COLUMN "meeting_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "meeting_attendees_entity" DROP COLUMN "sub_phase_flag"`);
        await queryRunner.query(`ALTER TABLE "meeting_attendees_entity" ADD "sub_phase_flag" character varying`);
        await queryRunner.query(`ALTER TABLE "meeting_attendees_entity" DROP COLUMN "hub_id"`);
    }

}
