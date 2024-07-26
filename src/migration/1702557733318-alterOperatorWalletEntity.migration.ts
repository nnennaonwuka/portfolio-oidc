import {MigrationInterface, QueryRunner} from "typeorm";

export class alterOperatorWalletEntity1702557733318 implements MigrationInterface {
    name = 'alterOperatorWalletEntity1702557733318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Rename existing table
        await queryRunner.query(`ALTER TABLE "operator_wallet_details_entity" RENAME TO "wallet_details_entity"`);
    
        // Add new columns
        await queryRunner.query(`ALTER TABLE "wallet_details_entity" ADD "role" character varying`);
        await queryRunner.query(`ALTER TABLE "wallet_details_entity" ADD "entity_id" character varying`);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverse changes in the down migration
        await queryRunner.query(`ALTER TABLE "wallet_details_entity" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "wallet_details_entity" DROP COLUMN "entity_id"`);
        await queryRunner.query(`ALTER TABLE "wallet_details_entity" RENAME TO "operator_wallet_details_entity"`);
    }

}

