import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createBets1639051695056 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'bets',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true
                },
                {
                    name: 'user_id',
                    type: 'char(36)',
                    isNullable: true
                },
                {
                    name: 'game_id',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'numbers',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
            foreignKeys: [
                {
                    name: 'FKUserID',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    columnNames: ['user_id'],
                    onDelete: 'SET NULL',
                    onUpdate: 'SET NULL'
                },
                {
                    name: 'FKGameID',
                    referencedTableName: 'games',
                    referencedColumnNames: ['id'],
                    columnNames: ['game_id'],
                    onDelete: 'SET NULL',
                    onUpdate: 'SET NULL'
                }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('bets')
    }

}
