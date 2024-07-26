import {MigrationInterface, QueryRunner} from "typeorm";

export class updateBankCardAssignmentAndDeliverableItemsEntity1720186408550 implements MigrationInterface {
    name = 'updateBankCardAssignmentAndDeliverableItemsEntity1720186408550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliverable_items" ADD "visible_entity_id" character varying`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" ADD "bank_card_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" DROP CONSTRAINT "PK_3144104234ec4510c75988f9dbf"`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" ADD CONSTRAINT "PK_73912beb71ddc5edf169fa66be1" PRIMARY KEY ("unique_entity_id", "bank_card_id")`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" ADD "leader_present_flag" character varying`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" ADD "status" character varying NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" ADD "item_info" character varying`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" ADD "item_id" character varying`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" ADD "card_image" character varying`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" ADD "card_holder_image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" DROP COLUMN "card_holder_image"`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" DROP COLUMN "card_image"`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" DROP COLUMN "item_id"`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" DROP COLUMN "item_info"`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" DROP COLUMN "leader_present_flag"`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" DROP CONSTRAINT "PK_73912beb71ddc5edf169fa66be1"`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" ADD CONSTRAINT "PK_3144104234ec4510c75988f9dbf" PRIMARY KEY ("unique_entity_id")`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" DROP COLUMN "bank_card_id"`);
        await queryRunner.query(`ALTER TABLE "deliverable_items" DROP COLUMN "visible_entity_id"`);
        await queryRunner.query(`ALTER TABLE "commission_charge_details_entity" DROP COLUMN "hbh"`);
    }

}
