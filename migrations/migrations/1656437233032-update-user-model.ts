import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserModel1656437233032 implements MigrationInterface {
  name: string = 'UpdateUserModel1656437233032';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "User" ADD "lastname" character varying NOT NULL', undefined);
    await queryRunner.query('ALTER TABLE "User" ADD "email" character varying NOT NULL', undefined);
    await queryRunner.query(
      'ALTER TABLE "User" ADD CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email")',
      undefined
    );
    await queryRunner.query('ALTER TABLE "User" ADD "password" character varying NOT NULL', undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "User" DROP COLUMN "password"', undefined);
    await queryRunner.query('ALTER TABLE "User" DROP CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e"', undefined);
    await queryRunner.query('ALTER TABLE "User" DROP COLUMN "email"', undefined);
    await queryRunner.query('ALTER TABLE "User" DROP COLUMN "lastname"', undefined);
  }
}
