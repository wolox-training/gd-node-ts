import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRoleColumn1661879264390 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "User" ADD COLUMN "role" varchar NULL DEFAULT \'standard\'',
      undefined
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "User" DROP COLUMN "role"', undefined);
  }
}
