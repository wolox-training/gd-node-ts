import { MigrationInterface, QueryRunner } from 'typeorm';

export class TableCardUser1663183847496 implements MigrationInterface {
  name: string = 'tableCardUser1663183847496';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "card_users__user" ("cardId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_b299f720bc6bcb15b3c7c549a41" PRIMARY KEY ("cardId", "userId"))',
      undefined
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_185e657134577fdb7d3bfc926e" ON "card_users__user" ("cardId") ',
      undefined
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_191243bb40e924f85c06a4f3f2" ON "card_users__user" ("userId") ',
      undefined
    );
    await queryRunner.query(
      'ALTER TABLE "card_users__user" ADD CONSTRAINT "FK_185e657134577fdb7d3bfc926e6" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
      undefined
    );
    await queryRunner.query(
      'ALTER TABLE "card_users__user" ADD CONSTRAINT "FK_191243bb40e924f85c06a4f3f2c" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "card_users__user" DROP CONSTRAINT "FK_191243bb40e924f85c06a4f3f2c"',
      undefined
    );
    await queryRunner.query(
      'ALTER TABLE "card_users__user" DROP CONSTRAINT "FK_185e657134577fdb7d3bfc926e6"',
      undefined
    );
    await queryRunner.query('DROP INDEX "IDX_191243bb40e924f85c06a4f3f2"', undefined);
    await queryRunner.query('DROP INDEX "IDX_185e657134577fdb7d3bfc926e"', undefined);
    await queryRunner.query('DROP TABLE "card_users__user"', undefined);
  }
}
