import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CardModels1662401805793 implements MigrationInterface {
  public up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'Card',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, generationStrategy: 'increment', isGenerated: true },
          { name: 'name', type: 'varchar' },
          { name: 'cardId', type: 'varchar' },
          { name: 'dbfId', type: 'varchar' },
          { name: 'cardSet', type: 'varchar' },
          { name: 'type', type: 'varchar' },
          { name: 'faction', type: 'varchar' },
          { name: 'cost', type: 'int' },
          { name: 'text', type: 'varchar' },
          { name: 'playerClass', type: 'varchar' },
          { name: 'locale', type: 'varchar' }
        ]
      })
    );
  }

  public down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('Card');
  }
}
