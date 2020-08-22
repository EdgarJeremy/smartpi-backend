import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface DetectionAttributes {
	id?: number;
	detection_time: Date;
	created_at?: Date;
	updated_at?: Date;
}

export interface DetectionInstance extends Sequelize.Instance<DetectionAttributes>, DetectionAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const DetectionFactory: Factory<DetectionInstance, DetectionAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<DetectionInstance, DetectionAttributes> => {
	const attributes: SequelizeAttributes<DetectionAttributes> = {
		detection_time: {
			type: DataTypes.DATE,
			allowNull: false
		}
	};
	const Detection: Sequelize.Model<DetectionInstance, DetectionAttributes> = sequelize.define<
		DetectionInstance,
		DetectionAttributes
	>('detection', attributes, { underscored: true });

	Detection.associate = (models: ModelFactoryInterface): void => {
	};

	return Detection;
};
