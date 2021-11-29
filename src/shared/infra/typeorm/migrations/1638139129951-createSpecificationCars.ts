import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createSpecificationCars1638139129951
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specifications_cars',
        columns: [
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'specification_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'FKSpecificationCar',
        referencedTableName: 'specification',
        columnNames: ['specification_id'],
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );

    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'FKCarSpecification',
        referencedTableName: 'cars',
        columnNames: ['car_id'],
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'specifications_car',
      'FKCarSpecification'
    );
    await queryRunner.dropForeignKey(
      'specifications_car',
      'FKSpecificationCar'
    );

    await queryRunner.dropTable('specifications_cars');
  }
}
