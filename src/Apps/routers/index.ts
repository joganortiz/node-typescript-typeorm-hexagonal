import { type Router } from 'express';
import { globSync } from 'glob';

/**
 * @description function that gets all the path files of the project
 * @date 6/17/2023 - 9:04:45 PM
 * @author Jogan Ortiz Muñoz
 *
 * @async
 * @param {Router} router
 * @returns {Promise<void>}
 */
export const registerRoutes = async (router: Router): Promise<void> => {
    const routesPath: string[] = globSync(
        `${__dirname}/../../Contexts/Mooc/**/infrastructure/rest-api/routes/*.routes.{ts,js}`
    );
    routesPath.map(async (routePath: string) => {
        await register(routePath, router);
    });
};

/**
 * @description function that creates a path for each file
 * @date 6/17/2023 - 9:04:40 PM
 * @author Jogan Ortiz Muñoz
 *
 * @async
 * @param {string} routePath
 * @param {Router} router
 * @returns {*}
 */
const register = async (routePath: string, router: Router): Promise<void> => {
    const { register } = (await require(routePath)) as {
        register: (router: Router) => void;
    };

    register(router);
};
