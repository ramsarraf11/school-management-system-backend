import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    Default,
} from 'sequelize-typescript';
import Organization from './organization.model';
import Shift from './shift.model';

@Table({
    tableName: 'employees',
    timestamps: true,
})
export default class Employee extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    employeeNumber!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    firstName!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    lastName!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    panNumber!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    aadhaar?: string;

    @Column({ type: DataType.STRING, allowNull: false })
    roleId!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    departmentId!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    designationId!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    gender!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    email!: string;

    @Column({ type: DataType.DATEONLY, allowNull: false })
    dateOfBirth!: string;

    @Column({ type: DataType.DATEONLY, allowNull: false })
    dateOfJoining!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    bloodGroup?: string;

    @Column({ type: DataType.STRING, allowNull: false })
    contactNumber!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    education?: string;

    @ForeignKey(() => Shift)
    @Column({ type: DataType.INTEGER, allowNull: true })
    shiftId!: number | null; // Foreign key to the Shift model

    @BelongsTo(() => Shift)
    shift!: Shift; // Association to fetch the shift assigned to the employee

    @Column({ type: DataType.TEXT, allowNull: true })
    address?: string;

    @Column({ type: DataType.STRING, allowNull: true })
    profilePhotoUrl?: string;

    @Column({
        type: DataType.JSON,
        allowNull: true,
    })
    experience?: {
        name: string;
        from: string;
        to: string;
        fileUrl?: string;
    }[];

    // Payroll Info
    @Column({ type: DataType.ENUM('Permanent', 'Contract', 'Temporary'), allowNull: false })
    employmentType!: 'Permanent' | 'Contract' | 'Temporary';

    @Column({ type: DataType.FLOAT, allowNull: false })
    basicPay!: number;

    @Column({ type: DataType.FLOAT, allowNull: true })
    ItDeclarationPerYear?: number;

    @Column({ type: DataType.FLOAT, allowNull: false })
    netAmount!: number;

    @Column({ type: DataType.FLOAT, allowNull: true })
    allowanceDA?: number;

    @Column({ type: DataType.FLOAT, allowNull: true })
    allowanceHRA?: number;

    @Column({ type: DataType.FLOAT, allowNull: true })
    deductionPTax?: number;

    // Optional organization link
    @ForeignKey(() => Organization)
    @Column({ type: DataType.INTEGER, allowNull: true })
    organizationId!: number | null;

    @BelongsTo(() => Organization)
    organization?: Organization;

    @Default(true)
    @Column({ type: DataType.BOOLEAN })
    is_active!: boolean;

    createdAt?: Date;
    updatedAt?: Date;
}