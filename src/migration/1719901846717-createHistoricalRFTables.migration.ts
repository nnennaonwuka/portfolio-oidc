import {MigrationInterface, QueryRunner} from "typeorm";

export class createHistoricalRFTables1719901846717 implements MigrationInterface {
    name = 'createHistoricalRFTables1719901846717'

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE TABLE "historical_trust_group_generated_rf_entity" ("rf_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rf_type" character varying, "rf_status" integer, "staff_id_created" character varying, "staff_id_solved" character varying, "staff_id_updated" character varying, "hub_id" character varying, "ik_number" character varying, "reopen_flag" integer, "contact_person" character varying, "contact_method" character varying, "date_logged" character varying, "date_solved" character varying, "date_updated" character varying, "comment_created" character varying, "comment_solved" character varying, "comment_updated" character varying, "app_version" character varying, "imei" character varying, "system_risk_level" character varying, "user_risk_level" character varying, "log_entity_id" character varying, "solve_entity_id" character varying, "category" character varying, "solve_method" character varying, "red_flag_id" character varying, "presence_flag" character varying, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "insert_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2f9d814aaff01d2a3c3d39c7f57" PRIMARY KEY ("rf_id"))`);
        await queryRunner.query(`CREATE TABLE "historical_staff_generated_rf_entity" ("rf_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rf_type" character varying NOT NULL, "rf_status" integer, "staff_id_created" character varying, "staff_id_solved" character varying, "staff_id_verified" character varying, "hub_id" character varying, "red_flagged_staff_id" character varying, "reopen_flag" integer, "date_logged" character varying, "date_solved" character varying, "date_verified" character varying, "comment_created" character varying, "comment_solved" character varying, "comment_verified" character varying, "entity_id" character varying, "image_name" character varying, "system_risk_level" character varying, "user_risk_level" character varying, "presence_flag" character varying, "app_version" character varying, "imei" character varying, "log_entity_id" character varying, "solve_entity_id" character varying, "category" character varying, "solve_method" character varying, "red_flag_id" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "insert_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_812490ff8f347d31236c54aab78" PRIMARY KEY ("rf_id"))`);
        await queryRunner.query(`CREATE TABLE "historical_member_generated_rf_entity" ("rf_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rf_type" character varying NOT NULL, "rf_status" integer, "staff_id_created" character varying, "staff_id_solved" character varying, "staff_id_verified" character varying, "hub_id" character varying, "ik_number" character varying, "unique_member_id" character varying, "reopen_flag" integer, "date_logged" character varying, "date_solved" character varying, "date_verified" character varying, "comment_created" character varying, "comment_solved" character varying, "comment_verified" character varying, "red_flag_id" character varying, "presence_flag" character varying, "app_version" character varying, "imei" character varying, "contact_person" character varying, "contact_method" character varying, "image_name" character varying, "system_risk_level" character varying, "user_risk_level" character varying, "log_entity_id" character varying, "solve_entity_id" character varying, "category" character varying, "solve_method" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "insert_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b9a5cad6fe18d8ab05d72fe05b1" PRIMARY KEY ("rf_id"))`);
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
   
        await queryRunner.query(`DROP TABLE "historical_member_generated_rf_entity"`);
        await queryRunner.query(`DROP TABLE "historical_staff_generated_rf_entity"`);
        await queryRunner.query(`DROP TABLE "historical_trust_group_generated_rf_entity"`);
    
    }

}
