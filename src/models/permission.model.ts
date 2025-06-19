import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
    CreatedAt,
    UpdatedAt,
} from 'sequelize-typescript';
import Role from './role.model';
import RolePermission from './role.permission.model';

@Table({
    tableName: 'permissions',
    timestamps: true,
})
export default class Permission extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true,
    })
    permissionName!: string; // e.g., CREATE_ORGANIZATION, VIEW_ORGANIZATION

    @HasMany(() => RolePermission)
    rolePermissions!: RolePermission[];

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}