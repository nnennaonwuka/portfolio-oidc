import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnsToVisitationInformationEntity1705668572460 implements MigrationInterface {
    name = 'addColumnsToVisitationInformationEntity1705668572460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "visitation_information_entity" ADD "latitude" character varying`);
        await queryRunner.query(`ALTER TABLE "visitation_information_entity" ADD "longitude" character varying`);
        await queryRunner.query(`ALTER TABLE "visitation_information_entity" ADD "image_name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "visitation_information_entity" DROP COLUMN "image_name"`);
        await queryRunner.query(`ALTER TABLE "visitation_information_entity" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "visitation_information_entity" DROP COLUMN "latitude"`);
    }

}
