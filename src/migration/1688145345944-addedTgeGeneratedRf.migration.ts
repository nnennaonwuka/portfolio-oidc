import { MigrationInterface, QueryRunner } from "typeorm";

export class addedTgeGeneratedRf1688145345944 implements MigrationInterface {
  name = "addedTgeGeneratedRf1688145345944";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tge_generated_rf_entity" ("rf_id" character varying NOT NULL, "rf_type" character varying NOT NULL, "rf_status" integer, "staff_id_created" character varying, "staff_id_solved" character varying, "staff_id_verified" character varying, "hub_id" character varying, "ik_number" character varying, "tge_id" character varying, "reopen_flag" integer, "date_logged" character varying, "date_solved" character varying, "date_verified" character varying, "comment_created" character varying, "comment_solved" character varying, "comment_verified" character varying, "app_version" character varying NOT NULL, "imei" character varying NOT NULL, "contact_person" character varying, "contact_method" character varying, "image_name" character varying, "system_risk_level" character varying, "user_risk_level" character varying, "log_entity_id" character varying, "solve_entity_id" character varying, "category" character varying, "solve_method" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c3e52ea213ac081f0e4610de3ce" PRIMARY KEY ("rf_id"))`
    );

    await queryRunner.query(
      `ALTER TABLE "member_generated_rf_entity" ADD "solve_method" character varying`
    );

    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" ADD "solve_method" character varying`
    );

    await queryRunner.query(
      `ALTER TABLE "trust_group_generated_rf_entity" ADD "solve_method" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "trust_group_generated_rf_entity" DROP COLUMN "solve_method"`
    );

    await queryRunner.query(
      `ALTER TABLE "staff_generated_rf_entity" DROP COLUMN "solve_method"`
    );

    await queryRunner.query(
      `ALTER TABLE "member_generated_rf_entity" DROP COLUMN "solve_method"`
    );

    await queryRunner.query(`DROP TABLE "tge_generated_rf_entity"`);
  }
}
