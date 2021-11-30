import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createCarImagens1638218892179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'car_imagens',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'car_id', type: 'uuid' },
          { name: 'car_image', type: 'varchar' },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
      })
    );
    await queryRunner.createForeignKey(
      'car_imagens',
      new TableForeignKey({
        name: 'FKCarImage',
        referencedTableName: 'cars',
        columnNames: ['car_id'],
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('car_imagens', 'FKCarImage');
    await queryRunner.dropTable('car_imagens');
  }
}
