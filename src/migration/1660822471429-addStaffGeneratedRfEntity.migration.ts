import { MigrationInterface, QueryRunner } from "typeorm";

export class addStaffGeneratedRfEntity1660822471429
  implements MigrationInterface
{
  name = "addStaffGeneratedRfEntity1660822471429";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "staff_generated_rf_entity" ("rf_id" character varying NOT NULL, "rf_type" character varying NOT NULL, "rf_status" integer, "staff_id_created" character varying, "staff_id_solved" character varying, "staff_id_verified" character varying, "hub_id" character varying, "red_flagged_staff_id" character varying, "reopen_flag" integer, "date_logged" character varying, "date_solved" character varying, "date_verified" character varying, "comment_created" character varying, "comment_solved" character varying, "comment_verified" character varying, "app_version" character varying NOT NULL, "imei" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8fd0b98190e4f41d9019baf10ca" PRIMARY KEY ("rf_id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "staff_generated_rf_entity"`);
  }
}
