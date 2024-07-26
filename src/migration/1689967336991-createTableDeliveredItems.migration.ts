import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableDeliveredItems1689967336991
  implements MigrationInterface
{
  name = "createTableDeliveredItems1689967336991";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "delivered_items" ("delivered_item_id" character varying NOT NULL, "unique_reciever_id" character varying, "entity_id" character varying, "staff_id" character varying, "ik_number" character varying, "item_id" character varying, "delivery_date" character varying, "app_version" character varying, "imei" character varying, "hub_id" character varying, "item_info" character varying, "item_amount" integer, "reason" character varying, "sync_flag" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_78320e20bf75c80bc711d79fec0" PRIMARY KEY ("delivered_item_id"))`
    );

    await queryRunner.query(
      `CREATE TABLE "bank_card_assignment_info" ("unique_entity_id" character varying NOT NULL, "entity_id" character varying, "staff_id" character varying, "pan" character varying, "expiry_date" character varying, "assigned_date" character varying, "ik_number" character varying, "app_version" character varying, "imei" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3144104234ec4510c75988f9dbf" PRIMARY KEY ("unique_entity_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "deliverable_items" ("item_id" character varying NOT NULL, "item_name" character varying, "max_number" integer, "entered_item_info" character varying, "qr_flag" integer, "qr_regex" character varying, "reason_list" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a4a8ba4cccfb7fdd7099d301e32" PRIMARY KEY ("item_id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "delivered_items"`);
    await queryRunner.query(`DROP TABLE "deliverable_items"`);
    await queryRunner.query(`DROP TABLE "bank_card_assignment_info"`);
  }
}
