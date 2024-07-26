import {MigrationInterface, QueryRunner} from "typeorm";
// Run migration
export class alterWalletDetailsEntity1711533368552 implements MigrationInterface {
    name = 'alterWalletDetailsEntity1711533368552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet_details_entity" RENAME COLUMN "staff_id" TO "unique_entity_id"`);
        await queryRunner.query(`ALTER TABLE "wallet_details_entity" RENAME CONSTRAINT "PK_b4954ade72a59704d104f69669c" TO "PK_c40f4b237b71e07d3453e044ba5"`);
        await queryRunner.query(`ALTER TABLE "confirmed_deposits_entity" ADD "status" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "confirmed_deposits_entity" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "wallet_details_entity" RENAME CONSTRAINT "PK_c40f4b237b71e07d3453e044ba5" TO "PK_b4954ade72a59704d104f69669c"`);
        await queryRunner.query(`ALTER TABLE "wallet_details_entity" RENAME COLUMN "unique_entity_id" TO "staff_id"`);
    }

}
