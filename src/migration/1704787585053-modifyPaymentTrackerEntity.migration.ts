import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyPaymentTrackerEntity1704787585053 implements MigrationInterface {
    name = 'modifyPaymentTrackerEntity1704787585053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_tracker_entity" ADD "community_flag" integer`);
        await queryRunner.query(`ALTER TABLE "payment_tracker_entity" ADD "payment_plan_flag" integer DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_tracker_entity" DROP COLUMN "payment_plan_flag"`);
        await queryRunner.query(`ALTER TABLE "payment_tracker_entity" DROP COLUMN "community_flag"`);
    }

}
