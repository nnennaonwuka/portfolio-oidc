import { MigrationInterface, QueryRunner } from "typeorm";

export class addHubColumnToEntities1662123330657 implements MigrationInterface {
  name = "addHubColumnToEntities1662123330657";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member_edit_entity" ADD "hub" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "new_member_details_entity" ADD "hub" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "transfer_entity" ADD "hub" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "transfer_entity" DROP COLUMN "hub"`);
    await queryRunner.query(
      `ALTER TABLE "new_member_details_entity" DROP COLUMN "hub"`
    );
    await queryRunner.query(
      `ALTER TABLE "member_edit_entity" DROP COLUMN "hub"`
    );
  }
}
