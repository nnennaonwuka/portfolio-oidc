import {MigrationInterface, QueryRunner} from "typeorm";

export class ModifyBankCardAssignmentPrimaryKey1721403512216 implements MigrationInterface {
    name = 'ModifyBankCardAssignmentPrimaryKey1721403512216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" DROP CONSTRAINT "PK_73912beb71ddc5edf169fa66be1"`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" ALTER COLUMN "bank_card_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" ADD CONSTRAINT "PK_73912beb71ddc5edf169fa66be1" PRIMARY KEY ("unique_entity_id", "bank_card_id")`);
           }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" DROP CONSTRAINT "PK_73912beb71ddc5edf169fa66be1"`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" ADD CONSTRAINT "PK_b5fa9dd19216f120d935de1f98d" PRIMARY KEY ("unique_entity_id")`);
        await queryRunner.query(`ALTER TABLE "bank_card_assignment_info" ALTER COLUMN "bank_card_id" SET DEFAULT nextval('bank_card_assignment_info_bank_card_id_seq'::regclass)`);
      }

}
