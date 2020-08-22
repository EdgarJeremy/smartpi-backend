import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { AgendaInstance, AgendaAttributes } from '../models/Agenda';
import NotFoundError from '../classes/NotFoundError';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';

const agendasRoute: Routes = (
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
                const parsed: sequelize.FindOptions<AgendaInstance> = Parser.parseQuery<AgendaInstance>(
                    req.query.q,
                    models,
                );
                const data: PaginatedResult<AgendaInstance> = await models.Agenda.findAndCountAll(parsed);
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
                const agenda: AgendaInstance | null = await models.Agenda.findOne({ where: { id } });
                if (!agenda) throw new NotFoundError('Agenda tidak ditemukan');
                const body: OkResponse = { data: agenda };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const data: AgendaAttributes = req.body;
                const agenda: AgendaInstance = await models.Agenda.create(data);
                const body: OkResponse = { data: agenda };
                res.json(body);
            },
        ),
    );

    router.put(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const data: AgendaAttributes = req.body;
                const agenda: AgendaInstance | null = await models.Agenda.findOne({ where: { id } });
                if (!agenda) throw new NotFoundError('Agenda tidak ditemukan');
                await agenda.update(data);
                const body: OkResponse = { data: agenda };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const agenda: AgendaInstance | null = await models.Agenda.findOne({ where: { id } });
                if (!agenda) throw new NotFoundError('Agenda tidak ditemukan');
                await agenda.destroy();
                const body: OkResponse = { data: agenda };

                res.json(body);
            },
        ),
    );

    return router;
};

export default agendasRoute;
