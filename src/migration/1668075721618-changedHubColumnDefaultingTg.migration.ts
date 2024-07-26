import {MigrationInterface, QueryRunner} from "typeorm";

export class changedHubColumnDefaultingTg1668075721618 implements MigrationInterface {
    name = 'changedHubColumnDefaultingTg1668075721618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "defaulting_tg_entity" RENAME COLUMN "hub_id" TO "hub"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "defaulting_tg_entity" RENAME COLUMN "hub" TO "hub_id"`);
    }

}
