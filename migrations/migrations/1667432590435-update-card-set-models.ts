import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCardSet1667432590435 implements MigrationInterface {
  name: string = 'updateCardSetModels1667432590435';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "Card" ADD "setId" integer', undefined);
    await queryRunner.query(
      'ALTER TABLE "Set" ADD CONSTRAINT "PK_f0aa4512284ee16bfc68f86a55c" PRIMARY KEY ("id")',
      undefined
    );
    await queryRunner.query(
      'ALTER TABLE "Card" ADD CONSTRAINT "FK_d80e34ed92e16613e7dd023299c" FOREIGN KEY ("setId") REFERENCES "Set"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "Card" DROP CONSTRAINT "FK_d80e34ed92e16613e7dd023299c"', undefined);
    await queryRunner.query('ALTER TABLE "Set" DROP CONSTRAINT "PK_f0aa4512284ee16bfc68f86a55c"', undefined);
    await queryRunner.query('ALTER TABLE "Card" DROP COLUMN "setId"', undefined);
  }
}
