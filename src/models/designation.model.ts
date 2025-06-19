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
import Organization from './organization.model';

@Table({
    tableName: 'designations',
    timestamps: true,
})
export default class Designation extends Model {
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
    designationName!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: true,
    })
    description?: string;

    @ForeignKey(() => Organization)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    organizationId!: number; // Foreign key to the Organization model

    @BelongsTo(() => Organization)
    organization!: Organization;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;
}