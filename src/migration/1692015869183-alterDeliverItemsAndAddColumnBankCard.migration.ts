import { MigrationInterface, QueryRunner } from "typeorm";

export class alterDeliverItemsAndAddColumnBankCard1692015869183
  implements MigrationInterface
{
  name = "alterDeliverItemsAndAddColumnBankCard1692015869183";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "delivered_items" RENAME COLUMN "unique_reciever_id" TO "unique_receiver_id"`
    );

    await queryRunner.query(
      `ALTER TABLE "bank_card_assignment_info" ADD "bg_card_number" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bank_card_assignment_info" DROP COLUMN "bg_card_number"`
    );
    await queryRunner.query(
      `ALTER TABLE "delivered_items" RENAME COLUMN "unique_receiver_id" TO "unique_reciever_id"`
    );
  }
}
