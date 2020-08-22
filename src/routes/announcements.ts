import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { AnnouncementInstance, AnnouncementAttributes } from '../models/Announcement';
import NotFoundError from '../classes/NotFoundError';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';

const announcementsRoute: Routes = (
    app: express.Application,
    models: ModelFactoryInterface,
): express.Router => {
    const router: express.Router = express.Router();

    // router.use(onlyAuth());

    router.get(
        '/',
        Parser.validateQ(),
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const parsed: sequelize.FindOptions<AnnouncementInstance> = Parser.parseQuery<AnnouncementInstance>(
                    req.query.q,
                    models,
                );
                const data: PaginatedResult<AnnouncementInstance> = await models.Announcement.findAndCountAll(parsed);
                const body: OkResponse = { data };

                res.json(body);
            },
        ),
    );

    router.get(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const announcement: AnnouncementInstance | null = await models.Announcement.findOne({ where: { id } });
                if (!announcement) throw new NotFoundError('Announcement tidak ditemukan');
                const body: OkResponse = { data: announcement };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const data: AnnouncementAttributes = req.body;
                const announcement: AnnouncementInstance = await models.Announcement.create(data);
                const body: OkResponse = { data: announcement };
                res.json(body);
            },
        ),
    );

    router.put(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const data: AnnouncementAttributes = req.body;
                const announcement: AnnouncementInstance | null = await models.Announcement.findOne({ where: { id } });
                if (!announcement) throw new NotFoundError('Announcement tidak ditemukan');
                await announcement.update(data);
                const body: OkResponse = { data: announcement };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const announcement: AnnouncementInstance | null = await models.Announcement.findOne({ where: { id } });
                if (!announcement) throw new NotFoundError('Announcement tidak ditemukan');
                await announcement.destroy();
                const body: OkResponse = { data: announcement };

                res.json(body);
            },
        ),
    );

    return router;
};

export default announcementsRoute;
