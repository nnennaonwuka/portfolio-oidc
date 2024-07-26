import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteUsersAndTgeGeneratedRfEntities1707840609198 implements MigrationInterface {
    name = 'deleteUsersAndTgeGeneratedRfEntities1707840609198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "tge_generated_rf_entity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
