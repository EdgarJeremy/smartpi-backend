import express from 'express';
import ModelFactoryInterface from '../models/typings/ModelFactoryInterface';
import { Routes } from './typings/RouteInterface';
import a from '../middlewares/wrapper/a';
import { OkResponse } from './typings/BodyBuilderInterface';
import { DetectionInstance, DetectionAttributes } from '../models/Detection';
import NotFoundError from '../classes/NotFoundError';
import { PaginatedResult } from './typings/QueryInterface';
import sequelize from 'sequelize';
import { Parser } from '../helpers/Parser';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const detectionsRoute: Routes = (
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
                const parsed: sequelize.FindOptions<DetectionInstance> = Parser.parseQuery<DetectionInstance>(
                    req.query.q,
                    models,
                );
                const data: PaginatedResult<DetectionInstance> = await models.Detection.findAndCountAll(parsed);
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
                const detection: DetectionInstance | null = await models.Detection.findOne({ where: { id } });
                if (!detection) throw new NotFoundError('Detection tidak ditemukan');
                const body: OkResponse = { data: detection };

                res.json(body);
            },
        ),
    );

    router.post(
        '/',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const data: DetectionAttributes = req.body;
                const videoStr = req.body.video;
                data.detection_time = new Date();
                const detection: DetectionInstance = await models.Detection.create(data);
                const body: OkResponse = { data: detection };
                try {
                    const ext = 'mkv';
                    fs.writeFileSync(path.resolve(__dirname, '..', '..', 'assets', 'detections', `detection-${detection.id}.${ext}`), Buffer.from(videoStr, 'base64'));
                    const from = path.resolve(__dirname, '..', '..', 'assets', 'detections', `detection-${detection.id}.${ext}`);
                    const to = path.resolve(__dirname, '..', '..', 'assets', 'detections', `detection-${detection.id}.mp4`);
                    execSync(`ffmpeg -i ${from} ${to}`);
                    console.log(`end saving file : detection-${detection.id}.mp4`);
                } catch (e) { console.log('error', e) }
                res.json(body);
            },
        ),
    );

    router.put(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const data: DetectionAttributes = req.body;
                const detection: DetectionInstance | null = await models.Detection.findOne({ where: { id } });
                if (!detection) throw new NotFoundError('Detection tidak ditemukan');
                await detection.update(data);
                const body: OkResponse = { data: detection };

                res.json(body);
            },
        ),
    );

    router.delete(
        '/:id',
        a(
            async (req: express.Request, res: express.Response): Promise<void> => {
                const { id }: any = req.params;
                const detection: DetectionInstance | null = await models.Detection.findOne({ where: { id } });
                if (!detection) throw new NotFoundError('Detection tidak ditemukan');
                await detection.destroy();
                const body: OkResponse = { data: detection };

                res.json(body);
            },
        ),
    );

    return router;
};

export default detectionsRoute;
