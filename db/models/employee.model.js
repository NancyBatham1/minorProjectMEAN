import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../index.js';

class Employee extends Model { }

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        father_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        emp_code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'user', 'manager'), // Enum with possible values
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        organization_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        is_delete: {
            type: DataTypes.ENUM('1', '2', '3'), // Enum with possible values [1 means notDlt, 2 means tempDlt, 3 means PermanatDlt]
        }
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'employee', // We need to choose the model name
    },
);

export default Employee;

