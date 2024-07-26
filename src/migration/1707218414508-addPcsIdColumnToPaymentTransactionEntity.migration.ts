import {MigrationInterface, QueryRunner} from "typeorm";

export class addPcsIdColumnToPaymentTransactionEntity1707218414508 implements MigrationInterface {
    name = 'addPcsIdColumnToPaymentTransactionEntity1707218414508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" ADD "pcs_logged_flag" integer`);
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" ADD "pcs_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" DROP COLUMN "pcs_id"`);
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" DROP COLUMN "pcs_logged_flag"`);
    }

}
