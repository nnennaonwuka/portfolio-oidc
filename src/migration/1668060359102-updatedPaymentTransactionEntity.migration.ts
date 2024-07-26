import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedPaymentTransactionEntity1668060359102
  implements MigrationInterface
{
  name = "updatedPaymentTransactionEntity1668060359102";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_transactions_entity" ADD "corrected_balance" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_transactions_entity" ADD "incorrect_balance_flag" integer`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_transactions_entity" DROP COLUMN "incorrect_balance_flag"`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_transactions_entity" DROP COLUMN "corrected_balance"`
    );
  }
}
