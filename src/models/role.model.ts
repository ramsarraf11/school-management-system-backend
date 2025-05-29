import { Table, Model, Column, DataType } from 'sequelize-typescript';
import User from './user.model';
import { HasMany } from 'sequelize-typescript';

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
  description!: string | null;

  @HasMany(() => User)
  users!: User[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}