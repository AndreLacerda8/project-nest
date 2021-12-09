import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUsersPermissions1639051686301 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users_permissions',
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
                    name: 'permission_id',
                    type: 'int',
                    isNullable: true
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
                    name: 'FKUserIDForPermission',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    columnNames: ['user_id'],
                    onDelete: 'SET NULL',
                    onUpdate: 'SET NULL'
                },
                {
                    name: 'FKPermissionID',
                    referencedTableName: 'permissions',
                    referencedColumnNames: ['id'],
                    columnNames: ['permission_id'],
                    onDelete: 'SET NULL',
                    onUpdate: 'SET NULL'
                }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_permissions')
    }

}
