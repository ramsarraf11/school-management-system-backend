import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import Organization from './organization.model';


@Table({
  tableName: 'students',
  timestamps: true,
})
export default class Student extends Model {
  // ========== BASIC STUDENT INFO ==========
  @Column({ type: DataType.STRING, allowNull: false })
  ecNumber!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  admissionNumber!: string;

  @Column({ type: DataType.STRING })
  udiseNumber!: string;

  @Column({ type: DataType.STRING })
  aadharNumber!: string;

  @Column({ type: DataType.STRING })
  panNumber!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  firstName!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName!: string;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  dateOfBirth!: Date;

  @Column({ type: DataType.STRING, allowNull: false })
  email!: string;

  @Column({ type: DataType.STRING })
  mobileNumber!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  class!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  section!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  rollNumber!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  gender!: string;

  @Column({ type: DataType.STRING })
  religion!: string;

  @Column({ type: DataType.STRING })
  bloodGroup!: string;

  @Column({ type: DataType.DATEONLY })
  admissionDate!: Date;

  @Column({ type: DataType.STRING })
  addressLastAttendedSchool!: string;

  @Column({ type: DataType.STRING })
  nameLastAttendedSchool!: string;

  @Column({ type: DataType.STRING })
  classLastAttended!: string;

  @Column({ type: DataType.STRING })
  lastSchoolAffiliated!: string;

  @Column({ type: DataType.STRING })
  transferCertificateNo!: string;

  @Column({ type: DataType.DATEONLY })
  transferCertificateIssueDate!: Date;

  @Column({ type: DataType.STRING })
  height!: string;

  @Column({ type: DataType.STRING })
  weight!: string;

  @Column({ type: DataType.BOOLEAN })
  isSingleGirlChild!: boolean;

  @Column({ type: DataType.BOOLEAN })
  isDivyang!: boolean;

  @Column({ type: DataType.BOOLEAN })
  belongsToEWS!: boolean;

  // ========== GUARDIAN INFO (Unified Block) ==========
  @Column({ type: DataType.STRING, allowNull: false })
  guardianName!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  guardianPhone!: string;

  @Column({ type: DataType.STRING })
  guardianEmail!: string;

  @Column({ type: DataType.STRING })
  guardianOccupation!: string;

  @Column({ type: DataType.STRING })
  guardianEducation!: string;

  @Column({ type: DataType.STRING })
  annualIncome!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  address!: string;

  // ========== LOGIN & FILES ==========
  @Column({ type: DataType.STRING })
  loginUsername!: string;

  @Column({ type: DataType.STRING })
  loginPassword!: string; // hashed

  @Column({ type: DataType.STRING })
  profilePhotoUrl!: string;

  @Column({ type: DataType.STRING })
  signatureUrl!: string;

  @Column({ type: DataType.STRING })
  uploadFilesUrl!: string;

  // ========== RELATIONS ==========

  @ForeignKey(() => Organization)
  @Column({ type: DataType.INTEGER })
  organizationId!: number;
}
