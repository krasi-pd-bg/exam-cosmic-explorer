import express from 'express';
import 'dotenv/config';

import routes from './routes.js';
import configExpress from './config/configExpress.js';
import configHandlebars from './config/configHandlebars.js';
import configDatabase from './config/configDatabase.js';

const app = express();

configDatabase();
configExpress(app);
configHandlebars(app);

app.use(routes);    

app.listen(3000, () => console.log('Server is listening on http://localhost:3000'));