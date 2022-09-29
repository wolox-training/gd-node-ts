import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAdminUser1661974044597 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'INSERT INTO "User" ("username", "lastname", "email", "password", "role") VALUES (\'john\', \'dow\', \'john.dow@wolox.com\', \'$2a$10$b/1J8bfFdv7ib/8XWhScaePV1.OfbfbstW00ynbOPk3WloCifVtJC\', \'admin\')',
      undefined
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM "User" WHERE id = 1', undefined);
  }
}
