import {MigrationInterface, QueryRunner} from "typeorm";

export class createPortfolioManagementConstantsEntity1707920370753 implements MigrationInterface {
    name = 'createPortfolioManagementConstantsEntity1707920370753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "portfolio_management_constants" ("key" character varying NOT NULL, "value" character varying NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_201d6d30e7199d93fa479ffcb4f" PRIMARY KEY ("key"))`);
        await queryRunner.query(`CREATE INDEX "portfolio_management_constants_updated_at_index" ON "portfolio_management_constants" ("updated_at") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."portfolio_management_constants_updated_at_index"`);
        await queryRunner.query(`DROP TABLE "portfolio_management_constants"`);
    }

}
