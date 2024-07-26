import { MigrationInterface, QueryRunner } from "typeorm";

export class addedTrustGroupGeneratedRf1687362998070
  implements MigrationInterface
{
  name = "addedTrustGroupGeneratedRf1687362998070";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "trust_group_generated_rf_entity" ("rf_id" character varying NOT NULL, "rf_type" character varying, "rf_status" integer, "staff_id_created" character varying, "staff_id_solved" character varying, "staff_id_updated" character varying, "hub_id" character varying, "ik_number" character varying, "reopen_flag" integer, "contact_person" character varying, "contact_method" character varying, "date_logged" character varying, "date_solved" character varying, "date_updated" character varying, "comment_created" character varying, "comment_solved" character varying, "comment_updated" character varying, "app_version" character varying, "imei" character varying, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_309c687972e1aa97c4ac677a0b2" PRIMARY KEY ("rf_id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "trust_group_generated_rf_entity"`);
  }
}
