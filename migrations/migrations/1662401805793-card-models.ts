import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CardModels1662401805793 implements MigrationInterface {
  public up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'Card',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, generationStrategy: 'increment', isGenerated: true },
          { name: 'name', type: 'varchar', isNullable: true },
          { name: 'cardId', type: 'varchar', isNullable: true },
          { name: 'dbfId', type: 'varchar', isNullable: true },
          { name: 'cardSet', type: 'varchar', isNullable: true },
          { name: 'type', type: 'varchar', isNullable: true },
          { name: 'faction', type: 'varchar', isNullable: true },
          { name: 'cost', type: 'int', isNullable: true },
          { name: 'attack', type: 'varchar', isNullable: true },
          { name: 'health', type: 'varchar', isNullable: true },
          { name: 'durability', type: 'varchar', isNullable: true },
          { name: 'rarity', type: 'varchar', isNullable: true },
          { name: 'text', type: 'varchar', isNullable: true },
          { name: 'flavor', type: 'varchar', isNullable: true },
          { name: 'artist', type: 'varchar', isNullable: true },
          { name: 'race', type: 'varchar', isNullable: true },
          { name: 'collectible', type: 'varchar', isNullable: true },
          { name: 'playerClass', type: 'varchar', isNullable: true },
          { name: 'img', type: 'varchar', isNullable: true },
          { name: 'locale', type: 'varchar', isNullable: true }
        ]
      })
    );
  }

  public down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('Card');
  }
}
