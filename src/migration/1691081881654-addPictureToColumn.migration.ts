import { MigrationInterface, QueryRunner } from "typeorm";

export class addPictureToColumn1691081881654 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      ` ALTER TABLE "delivered_items" ADD COLUMN "picture_name" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `ALTER TABLE "delivered_items" DROP COLUMN "picture_name"`
    );
  }
}
