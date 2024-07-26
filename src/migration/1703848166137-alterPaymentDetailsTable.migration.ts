import {MigrationInterface, QueryRunner} from "typeorm";

export class alterPaymentDetailsTable1703848166137 implements MigrationInterface {
    name = 'alterPaymentDetailsTable1703848166137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_details_entity" DROP COLUMN "payment_status"`);
        await queryRunner.query(`ALTER TABLE "payment_details_entity" ADD "payment_status" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_details_entity" DROP COLUMN "payment_status"`);
        await queryRunner.query(`ALTER TABLE "payment_details_entity" ADD "payment_status" integer DEFAULT '0'`);
    }

}
