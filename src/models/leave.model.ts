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
  import Employee from './employee.model';
  
  @Table({
    tableName: 'leaves',
    timestamps: true,
  })
  export default class Leave extends Model {
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
    leaveType!: string; // e.g., Sick Leave, Casual Leave, etc.
  
    @Column({
      type: DataType.DATE,
      allowNull: false,
    })
    startDate!: Date;
  
    @Column({
      type: DataType.DATE,
      allowNull: false,
    })
    endDate!: Date;
  
    @Column({
      type: DataType.STRING(255),
      allowNull: true,
    })
    reason?: string;
  
    @ForeignKey(() => Employee)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    employeeId!: number;
  
    @BelongsTo(() => Employee)
    employee!: Employee;
  
    @CreatedAt
    createdAt?: Date;
  
    @UpdatedAt
    updatedAt?: Date;
  }