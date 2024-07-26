import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedPaymentTransactionEntity1670621202423
  implements MigrationInterface
{
  name = "updatedPaymentTransactionEntity1670621202423";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_transactions_entity" RENAME COLUMN "incorrect_balance_flag" TO "balance_error_flag"`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_transactions_entity" ALTER COLUMN "balance_error_flag" SET DEFAULT '0'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_transactions_entity" ALTER COLUMN "balance_error_flag" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_transactions_entity" RENAME COLUMN "balance_error_flag" TO "incorrect_balance_flag"`
    );
  }
}
