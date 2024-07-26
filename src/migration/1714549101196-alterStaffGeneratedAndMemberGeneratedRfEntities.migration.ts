import {MigrationInterface, QueryRunner} from "typeorm";

export class alterStaffGeneratedAndMemberGeneratedRfEntities1714549101196 implements MigrationInterface {
    name = 'alterStaffGeneratedAndMemberGeneratedRfEntities1714549101196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "member_generated_rf_entity" ALTER COLUMN "app_version" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "member_generated_rf_entity" ALTER COLUMN "imei" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "staff_generated_rf_entity" ALTER COLUMN "app_version" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "staff_generated_rf_entity" ALTER COLUMN "imei" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "staff_generated_rf_entity" ALTER COLUMN "imei" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "staff_generated_rf_entity" ALTER COLUMN "app_version" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "member_generated_rf_entity" ALTER COLUMN "imei" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "member_generated_rf_entity" ALTER COLUMN "app_version" SET NOT NULL`);
    }

}
