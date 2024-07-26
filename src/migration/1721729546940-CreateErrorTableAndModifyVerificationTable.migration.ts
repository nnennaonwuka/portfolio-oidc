import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateErrorTableAndModifyVerificationTable1721729546940 implements MigrationInterface {
    name = 'CreateErrorTableAndModifyVerificationTable1721729546940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hr_prepaid_cards_entity" RENAME COLUMN "card_assignmnet_flag" TO "card_assignment_flag"`);
        await queryRunner.query(`CREATE TABLE "error_entity" ("error_id" integer NOT NULL, "error_message" character varying, "error_type" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a415ee8f769c97e21455594e670" PRIMARY KEY ("error_id"))`);
        await queryRunner.query(`ALTER TABLE "bank_card_verification_entity" ADD "ms_staff_id" character varying`);
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_card_verification_entity" DROP COLUMN "ms_staff_id"`);
        await queryRunner.query(`DROP TABLE "error_entity"`);
        await queryRunner.query(`ALTER TABLE "hr_prepaid_cards_entity" RENAME COLUMN "card_assignment_flag" TO "card_assignmnet_flag"`);
    }

}
