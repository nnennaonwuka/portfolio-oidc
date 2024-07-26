import {MigrationInterface, QueryRunner} from "typeorm";

export class addPcsLogFlagToPaymentDetailsEntity1706836561989 implements MigrationInterface {
    name = 'addPcsLogFlagToPaymentDetailsEntity1706836561989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_details_entity" ADD "pcs_logged_flag" integer`);
        await queryRunner.query(`ALTER TABLE "payment_details_entity" ADD "pcs_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_details_entity" DROP COLUMN "pcs_id"`);
        await queryRunner.query(`ALTER TABLE "payment_details_entity" DROP COLUMN "pcs_logged_flag"`);
    }

}
