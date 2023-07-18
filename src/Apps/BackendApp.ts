// import 'reflect-metadata';

import { Server } from './server';
// import { TypeOrmClientFactory } from '@Contexts/Shared/infrastructure/persistence/typeorm/TypeOrmClientFactory';
// import env from '@Contexts/Shared/infrastructure/config/env';

export class MoocBackendApp {
    server?: Server;

    /**
     * @description call the initialize method of our project
     * @date 6/15/2023 - 10:50:23 PM
     * @author Jogan Ortiz Muñoz
     *
     * @async
     * @returns {Promise<void>}
     */
    start = async (): Promise<void> => {
        const PORT = 4000;
        this.server = new Server(PORT);

        // connection db
        // const connection = new TypeOrmClientFactory();
        // await connection.initialize();

        await this.server.listen();
    };

    /**
     * @description call the shutdown method of our project
     * @date 6/15/2023 - 10:51:17 PM
     * @author Jogan Ortiz Muñoz
     *
     * @async
     * @returns {Promise<void>}
     */
    stop = async (): Promise<void> => {
        this.server?.stop();
    };
}
