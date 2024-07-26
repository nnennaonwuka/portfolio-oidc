import {MigrationInterface, QueryRunner} from "typeorm";

export class alterDepositsTable1704282571767 implements MigrationInterface {
    name = 'alterDepositsTable1704282571767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deposits_entity" DROP COLUMN "rejection_date"`);
        await queryRunner.query(`ALTER TABLE "deposits_entity" DROP COLUMN "rejection_comment"`);
        await queryRunner.query(`ALTER TABLE "deposits_entity" ADD "comment" character varying`);
        await queryRunner.query(`ALTER TABLE "deposits_entity" ADD "status_updated_date" character varying`);
        await queryRunner.query(`ALTER TABLE "deposits_entity" ADD "payment_details_id" character varying`);
        await queryRunner.query(`ALTER TABLE "deposits_entity" ADD "image_id" character varying`);
        await queryRunner.query(`ALTER TABLE "deposits_entity" ADD "payment_mode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deposits_entity" DROP COLUMN "payment_mode"`);
        await queryRunner.query(`ALTER TABLE "deposits_entity" DROP COLUMN "image_id"`);
        await queryRunner.query(`ALTER TABLE "deposits_entity" DROP COLUMN "payment_details_id"`);
        await queryRunner.query(`ALTER TABLE "deposits_entity" DROP COLUMN "status_updated_date"`);
        await queryRunner.query(`ALTER TABLE "deposits_entity" DROP COLUMN "comment"`);
        await queryRunner.query(`ALTER TABLE "deposits_entity" ADD "rejection_comment" character varying`);
        await queryRunner.query(`ALTER TABLE "deposits_entity" ADD "rejection_date" character varying`);
    }

}
