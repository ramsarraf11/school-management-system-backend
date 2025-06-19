import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import User from './user.model';
import RolePermission from './role.permission.model';

@Table({
  tableName: 'roles',
  timestamps: true,
})
export default class Role extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  roleName!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  description!: string;

  // ✅ One role can have many users
  @HasMany(() => User)
  users!: User[];

  @HasMany(() => RolePermission)
  rolePermissions!: RolePermission[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
