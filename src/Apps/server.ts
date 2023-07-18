import express, {
    type NextFunction,
    type Request,
    type Response
} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import Router from 'express-promise-router';
import errorHandler from 'errorhandler';
import type * as http from 'http';
import httpStatus from 'http-status';
import fileUpload from 'express-fileupload';
// import userAgent from "express-useragent";

import { registerRoutes } from './routers';

const CORS_OPTIONS = {
    origin: [],
    optionsSuccessStatus: 200
};

/**
 * @description class that initializes the project
 * @date 6/15/2023 - 10:46:10 PM
 * @author Jogan Ortiz Muñoz
 *
 * @export
 * @class Server
 * @typedef {Server}
 */
export class Server {
    private readonly _express: express.Express;
    private readonly _port: number;
    private httpServer?: http.Server;

    constructor(port: number) {
        this._port = port;
        this._express = express();
        this._express.use(bodyParser.urlencoded({ extended: true }));
        this._express.use(bodyParser.json());
        this._express.use(helmet.xssFilter());
        this._express.use(helmet.noSniff());
        this._express.use(helmet.hidePoweredBy());
        this._express.use(helmet.frameguard({ action: 'deny' }));
        this._express.use(compression());
        this._express.use(fileUpload());
        this._express.use(cors(CORS_OPTIONS));
        const router = Router();
        router.use(errorHandler());
        // router.use(this.typeBrowser);
        this._express.use('/api/v2', router);

        // project paths
        registerRoutes(router);

        this._express.use(
            (_req: Request, res: Response, _next: NextFunction) => {
                res.status(httpStatus.NOT_FOUND).json({
                    status: httpStatus.NOT_FOUND,
                    error: {
                        errorMsg: 'The path could not be found'
                    }
                });
            }
        );
    }

    /**
     * @description Validates if the connection to the port was successful
     * @date 6/15/2023 - 10:46:58 PM
     * @author Jogan Ortiz Muñoz
     *
     * @async
     * @returns {Promise<void>}
     */
    listen = async (): Promise<void> => {
        await new Promise(() => {
            this.httpServer = this._express.listen(this._port, () => {
                console.log('project running in port', this._port);
            });
        });
    };

    getHTTPServer = async (): Promise<http.Server | undefined> => {
        return this.httpServer;
    };

    /**
     * @description function that downloads our project
     * @date 6/15/2023 - 10:49:56 PM
     * @author Jogan Ortiz Muñoz
     *
     * @async
     * @returns {Promise<void>}
     */
    stop = async (): Promise<void> => {
        await new Promise((resolve, reject) => {
            if (this.httpServer != null) {
                this.httpServer.close((error) => {
                    if (error != null) {
                        reject(error);
                        return;
                    }
                    resolve(true);
                });
            }
            resolve(true);
        });
    };
}
