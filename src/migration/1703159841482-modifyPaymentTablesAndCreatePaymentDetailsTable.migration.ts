import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyPaymentTablesAndCreatePaymentDetailsTable1703159841482 implements MigrationInterface {
    name = 'modifyPaymentTablesAndCreatePaymentDetailsTable1703159841482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_details_entity" ("payment_details_id" character varying NOT NULL, "depositor_name" character varying, "deposit_date" character varying, "tg_id" character varying, "mode_of_payment" character varying, "amount" character varying, "latitude" character varying, "longitude" character varying, "date_logged" character varying, "bank_name" character varying, "bank_community_id" character varying, "bank_ward_id" character varying, "transaction_charges" character varying, "transaction_receipt_id" character varying, "company_receipt_id" character varying, "payment_transaction_id" character varying, "staff_id" character varying, "imei" character varying, "app_version" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "sync_flag" integer, "bank_lga_id" character varying, "payment_status" character varying NOT NULL DEFAULT 'PENDING', "delete_status" integer, "reason_for_deletion" character varying, CONSTRAINT "PK_31e15c32ed095db7bc970ef1b48" PRIMARY KEY ("payment_details_id"))`);
        await queryRunner.query(`ALTER TABLE "payment_tracker_entity" ADD "latitude" character varying`);
        await queryRunner.query(`ALTER TABLE "payment_tracker_entity" ADD "longitude" character varying`);
        await queryRunner.query(`ALTER TABLE "payment_tracker_entity" ADD "image_name" character varying`);
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" ADD "in_community_flag" integer`);
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" ADD "latitude" character varying`);
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" ADD "longitude" character varying`);
        await queryRunner.query(`ALTER TABLE "default_rf_log_entity" ADD "rf_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "default_rf_log_entity" DROP COLUMN "rf_id"`);
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "payment_transactions_entity" DROP COLUMN "in_community_flag"`);
        await queryRunner.query(`ALTER TABLE "payment_tracker_entity" DROP COLUMN "image_name"`);
        await queryRunner.query(`ALTER TABLE "payment_tracker_entity" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "payment_tracker_entity" DROP COLUMN "latitude"`);
        await queryRunner.query(`DROP TABLE "payment_details_entity"`);
    }

}
