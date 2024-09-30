import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../index.js';

class Modules extends Model { }

Modules.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        module_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accessable_by: {
            type: DataTypes.ENUM('admin', 'user', 'manager'), // Enum with possible values
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },

    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'modules', // We need to choose the model name
    },
);

export default Modules;

