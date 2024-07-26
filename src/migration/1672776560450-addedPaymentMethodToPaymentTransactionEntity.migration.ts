import { MigrationInterface, QueryRunner } from "typeorm";

export class addedPaymentMethodToPaymentTransactionEntity1672776560450
  implements MigrationInterface
{
  name = "addedPaymentMethodToPaymentTransactionEntity1672776560450";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_transactions_entity" ADD "payment_method" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_transactions_entity" DROP COLUMN "payment_method"`
    );
  }
}
