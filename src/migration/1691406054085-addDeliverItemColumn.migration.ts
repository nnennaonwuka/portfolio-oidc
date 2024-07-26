import { MigrationInterface, QueryRunner } from "typeorm";

export class addDeliverItemColumn1691406054085 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `ALTER TABLE "delivered_items" ADD COLUMN "delivery_id" character varying;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `ALTER TABLE "delivered_items" DROP COLUMN "delivery_id";`
    );
  }
}
