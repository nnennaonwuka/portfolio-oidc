import {MigrationInterface, QueryRunner} from "typeorm";

export class addCommissionChargeDetailsTable1707734448434 implements MigrationInterface {
    name = 'addCommissionChargeDetailsTable1707734448434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "commission_charge_details_entity" ("tg_id" character varying NOT NULL, "date_logged" character varying, "amount" character varying, "commission_charge" character varying, "image_name" character varying, "comment" character varying, "staff_id" character varying, "imei" character varying, "app_version" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a6e3c9a3a678305e1a84bf8a43b" PRIMARY KEY ("tg_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "commission_charge_details_entity"`);
    }

}
