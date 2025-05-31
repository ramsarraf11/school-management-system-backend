import { Table, Model, Column, DataType, Default } from 'sequelize-typescript';
import Role from './role.model';
import { ForeignKey, BelongsTo } from 'sequelize-typescript';
@Table({
  tableName: 'users',
  timestamps: true, // adds createdAt and updatedAt
})
export default class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    })
  username!: string;
  
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password!: string;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  is_active!: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  last_login!: Date | null;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId!: number;

  @BelongsTo(() => Role)
  role!: Role;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: any;
}