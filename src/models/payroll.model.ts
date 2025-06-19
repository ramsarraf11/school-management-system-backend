import { Table, Column, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import Employee from './employee.model';

@Table({ tableName: 'payrolls', timestamps: true })
export default class Payroll extends Model {
  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER, allowNull: false })
  employeeId!: number;

  @BelongsTo(() => Employee)
  employee!: Employee;

  @Column({ type: DataType.STRING, allowNull: false })
  month!: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  basicSalary!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  grossSalary!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  netSalary!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  totalDeduction!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  workingDays!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  absentDays!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  halfDays!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  payableAmount!: number;

  @Column({ type: DataType.ENUM('DUE', 'PAID'), defaultValue: 'DUE' })
  status!: 'DUE' | 'PAID';

  @Column({ type: DataType.STRING, allowNull: true })
  paymentMode?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  note?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  receiptFileUrl?: string;
}
