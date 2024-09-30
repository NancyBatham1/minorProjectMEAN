import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../index.js';

class Organization extends Model { }

Organization.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        is_delete: {
            type: DataTypes.ENUM('1', '2', '3'), // Enum with possible values [1 means notDlt, 2 means tempDlt, 3 means PermanatDlt]
        }
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'organization', // We need to choose the model name
    },
);

export default Organization;

