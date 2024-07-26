import {MigrationInterface, QueryRunner} from "typeorm";

export class addPosBankDetailsToPaymentClaimsEntity1711383134984 implements MigrationInterface {
    name = 'addPosBankDetailsToPaymentClaimsEntity1711383134984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_claims_entity" ADD "pos_bank_lga" character varying`);
        await queryRunner.query(`ALTER TABLE "payment_claims_entity" ADD "pos_bank_ward" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_claims_entity" DROP COLUMN "pos_bank_ward"`);
        await queryRunner.query(`ALTER TABLE "payment_claims_entity" DROP COLUMN "pos_bank_lga"`);
    }

}
