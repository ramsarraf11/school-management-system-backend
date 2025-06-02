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

@Table({
  tableName: 'organizations',
  timestamps: true,
})
export default class Organization extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  orglName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column(DataType.STRING)
  address?: string;

  @Column(DataType.STRING)
  phone?: string;

  @Column(DataType.STRING)
  email?: string;

  @Column(DataType.STRING)
  pinCode?: string;

  @Column(DataType.STRING)
  panNo?: string;

  @Column(DataType.STRING)
  taxNo?: string;

  @Column(DataType.DATE)
  financialYearStart?: Date;

  @Column(DataType.DATE)
  financialYearEnd?: Date;

  @Column(DataType.STRING)
  country?: string;

  @Column(DataType.STRING)
  state?: string;

  @Column(DataType.STRING)
  bankName?: string;

  @Column(DataType.STRING)
  accountNumber?: string;

  @Column(DataType.STRING)
  branchName?: string;

  @Column(DataType.STRING)
  ifscCode?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  enableGST!: boolean;

  @HasMany(() => User)
  users!: User[];
}
