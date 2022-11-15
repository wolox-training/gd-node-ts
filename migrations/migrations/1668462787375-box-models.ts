import { MigrationInterface, QueryRunner } from 'typeorm';

export class BoxModels1668462787375 implements MigrationInterface {
  name: string = 'boxModels1668462787375';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "Box" ("id" SERIAL NOT NULL, "userId" integer, CONSTRAINT "PK_7bee2ac3e4b1758b14db112d3b5" PRIMARY KEY ("id"))',
      undefined
    );
    await queryRunner.query('ALTER TABLE "Card" ADD "boxId" integer', undefined);
    await queryRunner.query(
      'ALTER TABLE "Card" ADD CONSTRAINT "UQ_a87e9ce0314ed41481c327edc16" UNIQUE ("boxId")',
      undefined
    );
    await queryRunner.query(
      'ALTER TABLE "Card" ADD CONSTRAINT "FK_a87e9ce0314ed41481c327edc16" FOREIGN KEY ("boxId") REFERENCES "Box"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined
    );
    await queryRunner.query(
      'ALTER TABLE "Box" ADD CONSTRAINT "FK_b563745bc6c7d888733a63b6372" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "Box" DROP CONSTRAINT "FK_b563745bc6c7d888733a63b6372"', undefined);
    await queryRunner.query('ALTER TABLE "Card" DROP CONSTRAINT "FK_a87e9ce0314ed41481c327edc16"', undefined);
    await queryRunner.query('ALTER TABLE "Card" DROP CONSTRAINT "UQ_a87e9ce0314ed41481c327edc16"', undefined);
    await queryRunner.query('ALTER TABLE "Card" DROP COLUMN "boxId"', undefined);
    await queryRunner.query('DROP TABLE "Box"', undefined);
  }
}
