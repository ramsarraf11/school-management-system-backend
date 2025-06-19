import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    CreatedAt,
    UpdatedAt,
} from 'sequelize-typescript';
import Role from './role.model';
import Permission from './permission.model';

@Table({
    tableName: 'role_permissions',
    timestamps: true,
})
export default class RolePermission extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    roleId!: number;

    @BelongsTo(() => Role)
    role!: Role;

    @ForeignKey(() => Permission)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    permissionId!: number;

    @BelongsTo(() => Permission)
    permission!: Permission;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}