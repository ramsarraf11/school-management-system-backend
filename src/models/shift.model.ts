import {
    Table,
    Model,
    Column,
    DataType,
    HasMany,
    CreatedAt,
    UpdatedAt,
  } from 'sequelize-typescript';
  import Employee from './employee.model';
  
  @Table({
    tableName: 'shifts',
    timestamps: true,
  })
  export default class Shift extends Model {
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
    shiftName!: string; // e.g., Morning Shift, Night Shift, etc.
  
    @Column({
      type: DataType.TIME,
      allowNull: false,
    })
    startTime!: string; // e.g., "09:00:00"
  
    @Column({
      type: DataType.TIME,
      allowNull: false,
    })
    endTime!: string; // e.g., "17:00:00"
  
    @Column({
      type: DataType.STRING(255),
      allowNull: true,
    })
    description?: string;
  
    @HasMany(() => Employee)
    employees!: Employee[];
  
    @CreatedAt
    createdAt?: Date;
  
    @UpdatedAt
    updatedAt?: Date;
  }