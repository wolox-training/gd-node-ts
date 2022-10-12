import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetModels1665592450226 implements MigrationInterface {
  name: string = 'setModels1665592450226';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "Set" ("id" SERIAL NOT NULL, "name" character varying, "userId" integer, CONSTRAINT "PK_f0aa4512284ee16bfc68f86a55c" PRIMARY KEY ("id"))',
      undefined
    );
    await queryRunner.query(
      'ALTER TABLE "card_users__user" ADD CONSTRAINT "PK_b299f720bc6bcb15b3c7c549a41" PRIMARY KEY ("cardId", "userId")',
      undefined
    );
    await queryRunner.query('ALTER TABLE "User" ALTER COLUMN "role" SET NOT NULL', undefined);
    await queryRunner.query(
      'ALTER TABLE "Card" ADD CONSTRAINT "UQ_96e36f0010822d887f89df5cb33" UNIQUE ("cardId")',
      undefined
    );
    await queryRunner.query(
      'ALTER TABLE "Card" ADD CONSTRAINT "UQ_0ca7b6042d3330df1d00364a864" UNIQUE ("dbfId")',
      undefined
    );
    await queryRunner.query(
      'ALTER TABLE "Set" ADD CONSTRAINT "FK_1642277c121ab2bf294860bc307" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "Set" DROP CONSTRAINT "FK_1642277c121ab2bf294860bc307"', undefined);
    await queryRunner.query('ALTER TABLE "Card" DROP CONSTRAINT "UQ_0ca7b6042d3330df1d00364a864"', undefined);
    await queryRunner.query('ALTER TABLE "Card" DROP CONSTRAINT "UQ_96e36f0010822d887f89df5cb33"', undefined);
    await queryRunner.query('ALTER TABLE "User" ALTER COLUMN "role" DROP NOT NULL', undefined);
    await queryRunner.query(
      'ALTER TABLE "card_users__user" DROP CONSTRAINT "PK_b299f720bc6bcb15b3c7c549a41"',
      undefined
    );
    await queryRunner.query('DROP TABLE "Set"', undefined);
  }
}
