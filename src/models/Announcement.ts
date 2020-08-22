import Sequelize from 'sequelize';
import { SequelizeAttributes } from './typings/SequelizeAttributes';
import { Factory } from './typings/ModelInterface';
import ModelFactoryInterface from './typings/ModelFactoryInterface';

export interface AnnouncementAttributes {
    id?: number;
	description: string;
	date: Date;
	created_at?: Date;
	updated_at?: Date;
}

export interface AnnouncementInstance extends Sequelize.Instance<AnnouncementAttributes>, AnnouncementAttributes {
}

export interface Associate {
	(models: ModelFactoryInterface): void;
}

export const AnnouncementFactory: Factory<AnnouncementInstance, AnnouncementAttributes> = (
	sequelize: Sequelize.Sequelize,
	DataTypes: Sequelize.DataTypes,
): Sequelize.Model<AnnouncementInstance, AnnouncementAttributes> => {
	const attributes: SequelizeAttributes<AnnouncementAttributes> = {
		description: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false
		}
	};
	const Announcement: Sequelize.Model<AnnouncementInstance, AnnouncementAttributes> = sequelize.define<
		AnnouncementInstance,
		AnnouncementAttributes
	>('announcement', attributes, { underscored: true });

	Announcement.associate = (models: ModelFactoryInterface): void => {
	};

	return Announcement;
};
