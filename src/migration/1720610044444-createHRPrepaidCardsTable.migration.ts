import {MigrationInterface, QueryRunner} from "typeorm";

export class createHRPrepaidCardsTable1720610044444 implements MigrationInterface {
    name = 'createHRPrepaidCardsTable1720610044444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hr_prepaid_cards_entity" ("id" SERIAL NOT NULL, "account_no" integer NOT NULL, "name_on_card" character varying, "product_code" character varying, "branch_no" character varying, "card_number" character varying, "modified_card_number" character varying, "pan" character varying, "card_assignmnet_flag" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_eae56162557e480a1fffa2d5878" PRIMARY KEY ("id", "account_no"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "hr_prepaid_cards_entity"`);
    }

}
