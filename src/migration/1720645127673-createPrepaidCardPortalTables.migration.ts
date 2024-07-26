import {MigrationInterface, QueryRunner} from "typeorm";

export class createPrepaidCardPortalTables1720645127673 implements MigrationInterface {
    name = 'createPrepaidCardPortalTables1720645127673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bank_card_verification_entity" ("verification_id" character varying NOT NULL, "bg_card_id" character varying, "staff_id" character varying, "ik_number" character varying, "gotten_ms_card_number" character varying, "gotten_pco_card_number" character varying, "expected_bg_card_number" character varying, "status" integer, "error_id" character varying, "error_log_date" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_098d3ae22263f81ab4ee6189214" PRIMARY KEY ("verification_id"))`);
        await queryRunner.query(`CREATE TABLE "notifications_entity" ("id" character varying NOT NULL, "content" character varying, "type" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_39dccc777268995087ce0ccd626" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_notifications_entity" ("staff_id" character varying NOT NULL, "notification_id" character varying, "is_read" integer, "is_cleared" integer, "read_at" character varying, "cleared_at" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_65466011cebde6682b230d05752" PRIMARY KEY ("staff_id"))`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" ADD "portal_card_status" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" DROP COLUMN "portal_card_status"`);
        await queryRunner.query(`DROP TABLE "user_notifications_entity"`);
        await queryRunner.query(`DROP TABLE "notifications_entity"`);
        await queryRunner.query(`DROP TABLE "bank_card_verification_entity"`);
    }

}
