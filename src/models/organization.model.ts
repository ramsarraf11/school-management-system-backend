import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'organizations',
  timestamps: true,
})
export default class Organization extends Model {
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

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  pinCode!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  panNo!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  taxNo!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  financialYearStart!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  financialYearEnd!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  country!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  state!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  bankName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  accountNumber!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  branchName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ifscCode!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  enableGST!: boolean;
}