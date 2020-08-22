import Sequelize from 'sequelize';
import { UserInstance, UserAttributes } from '../User';
import { TokenInstance, TokenAttributes } from '../Token';
import { DetectionInstance, DetectionAttributes } from '../Detection';
import { AgendaInstance, AgendaAttributes } from '../Agenda';
import { AnnouncementInstance, AnnouncementAttributes } from '../Announcement';

interface Obj {
	[s: string]: any;
}

export default interface ModelFactoryInterface extends Obj {
	sequelize: Sequelize.Sequelize;
	Sequelize: Sequelize.SequelizeStatic;
	User: Sequelize.Model<UserInstance, UserAttributes>;
	Token: Sequelize.Model<TokenInstance, TokenAttributes>;
	Detection: Sequelize.Model<DetectionInstance, DetectionAttributes>;
	Agenda: Sequelize.Model<AgendaInstance, AgendaAttributes>;
	Announcement: Sequelize.Model<AnnouncementInstance, AnnouncementAttributes>;
}
