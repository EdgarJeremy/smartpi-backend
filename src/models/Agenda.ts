import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface AgendaAttributes {
    id?: number;
	description: string;
	date: Date;
	time: string;
	created_at?: Date;
	updated_at?: Date;
}

export interface AgendaInstance extends Sequelize.Instance<AgendaAttributes>, AgendaAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const AgendaFactory: Factory<AgendaInstance, AgendaAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<AgendaInstance, AgendaAttributes> => {
	const attributes: SequelizeAttributes<AgendaAttributes> = {
		description: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		time: {
			type: DataTypes.TIME,
			allowNull: false
		}
	};
	const Agenda: Sequelize.Model<AgendaInstance, AgendaAttributes> = sequelize.define<
		AgendaInstance,
		AgendaAttributes
	>('agenda', attributes, { underscored: true });

	Agenda.associate = (models: ModelFactoryInterface): void => {
	};

	return Agenda;
};
