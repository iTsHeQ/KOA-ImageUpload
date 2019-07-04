const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const Swagger = require('./middlewares/swagger');
const SwaggerUi = require('koa2-swagger-ui');
const Routes = require('./routes');


const app = new Koa();

const router = new Router();

Routes(router);

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'KOA example',
            version: '1.0.0',
            description: 'A sample API',
        },
    },
    /** 
     * Paths to the API docs. The library will fetch comments marked 
     * by a @swagger tag to create the swagger.json document
     */
    apis: [
        './controllers/images.js',
    ],
    // where to publish the document
    path: '/swagger.json',
}

const swagger = Swagger(swaggerOptions);

// Build the UI for swagger and expose it on the /doc endpoint
const swaggerUi = SwaggerUi({
    routePrefix: '/doc',
    swaggerOptions: {
        url: swaggerOptions.path,
    }
});


app
    .use(swagger)
    .use(swaggerUi)
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3010);