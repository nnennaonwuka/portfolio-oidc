import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedPaymentTimelineEntity1672822855004
  implements MigrationInterface
{
  name = "updatedPaymentTimelineEntity1672822855004";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_timeline_entity" RENAME COLUMN "deliver_flag" TO "delivery_flag"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_timeline_entity" RENAME COLUMN "delivery_flag" TO "deliver_flag"`
    );
  }
}
