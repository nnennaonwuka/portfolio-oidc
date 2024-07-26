import {MigrationInterface, QueryRunner} from "typeorm";

export class alterPaymentDetailsTable1704284355579 implements MigrationInterface {
    name = 'alterPaymentDetailsTable1704284355579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_details_entity" ADD "transaction_receipt_image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_details_entity" DROP COLUMN "transaction_receipt_image"`);
    }

}
