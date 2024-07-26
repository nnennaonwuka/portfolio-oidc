import { MigrationInterface, QueryRunner } from "typeorm";

export class addedPortfolioManagementAssignmentEntity1671718300979
  implements MigrationInterface
{
  name = "addedPortfolioManagementAssignmentEntity1671718300979";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "portfolio_management_assignment_entity" ("ik_number" character varying NOT NULL, "hub" character varying, "hub_classification" character varying, "program" character varying, "pco" character varying, "mik" character varying, "mik_seed" character varying, "lmik" character varying, "lmik_seed" character varying, "msb" character varying, "bgt" character varying, "bgt_seed" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bbb49168db15e76dcde87acd387" PRIMARY KEY ("ik_number"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE "portfolio_management_assignment_entity"`
    );
  }
}
