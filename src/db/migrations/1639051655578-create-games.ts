import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createGames1639051655578 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'games',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true
                },
                {
                    name: 'type',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'description',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'range',
                    type: 'integer',
                    isNullable: false
                },
                {
                    name: 'price',
                    type: 'float',
                    isNullable: false
                },
                {
                    name: 'max_number',
                    type: 'integer',
                    isNullable: false
                },
                {
                    name: 'color',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('games')
    }

}
