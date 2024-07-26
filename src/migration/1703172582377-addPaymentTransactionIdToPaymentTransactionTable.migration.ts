import {MigrationInterface, QueryRunner} from "typeorm";

export class addPaymentTransactionIdToPaymentTransactionTable1703172582377 implements MigrationInterface {
    name = 'addPaymentTransactionIdToPaymentTransactionTable1703172582377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_details_entity" ADD "delete_date" character varying`);
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" DROP CONSTRAINT "PK_746158fa6d142f3f56285f2efab"`);
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" ADD "payment_transaction_id" character varying`);
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" ALTER COLUMN "tracker_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" ALTER COLUMN "receipt_id" DROP NOT NULL`);
        await queryRunner.query(`UPDATE "payment_transactions_entity" SET "payment_transaction_id" = CONCAT(tracker_id, '_', receipt_id)`);
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" ALTER COLUMN "payment_transaction_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" ADD CONSTRAINT "PK_53f0b35589d3fece19f945a911a" PRIMARY KEY ("payment_transaction_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" ADD CONSTRAINT "PK_746158fa6d142f3f56285f2efab" PRIMARY KEY ("tracker_id", "receipt_id")`);
        await queryRunner.query(`ALTER TABLE "payment_details_entity" DROP COLUMN "delete_date"`);
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" ALTER COLUMN "receipt_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" ALTER COLUMN "tracker_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" DROP COLUMN "payment_transaction_id"`);
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" DROP CONSTRAINT "PK_53f0b35589d3fece19f945a911a"`);
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" ALTER COLUMN "payment_transaction_id" DROP NOT NULL`);
    }

}
