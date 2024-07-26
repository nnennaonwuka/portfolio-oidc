import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyPrepaidCardVerificationTableAddPCOData1721039409175 implements MigrationInterface {
    name = 'modifyPrepaidCardVerificationTableAddPCOData1721039409175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_card_verification_entity" ADD "card_holder_image_pco" character varying`);
        await queryRunner.query(`ALTER TABLE "bank_card_verification_entity" ADD "card_image_pco" character varying`);
        await queryRunner.query(`ALTER TABLE "bank_card_verification_entity" ADD "pan_pco" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_card_verification_entity" DROP COLUMN "pan_pco"`);
        await queryRunner.query(`ALTER TABLE "bank_card_verification_entity" DROP COLUMN "card_image_pco"`);
        await queryRunner.query(`ALTER TABLE "bank_card_verification_entity" DROP COLUMN "card_holder_image_pco"`);
    }

}
