import { MigrationInterface, QueryRunner } from "typeorm";

export class changeReceiptDetails1685292694803 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "receipt_details_entity" RENAME COLUMN "depositors_name" TO "depositor_name"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "receipt_details_entity" RENAME COLUMN "depositor_name" TO "depositors_name"`);
  }
}
