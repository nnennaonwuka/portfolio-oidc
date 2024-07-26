import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedVisitationInformationEntities1675918763239
  implements MigrationInterface
{
  name = "updatedVisitationInformationEntities1675918763239";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "visitation_information_entity" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "visitation_information_entity" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "visitation_information_entity" DROP COLUMN "updated_at"`
    );
    await queryRunner.query(
      `ALTER TABLE "visitation_information_entity" DROP COLUMN "created_at"`
    );
  }
}
