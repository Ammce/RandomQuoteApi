import express from 'express';
import dbConfig from './config/db';
import author from './config/author';
import middlewaresConfig from './config/middleware';
import headers from './config/headers';
import { QuoteRoutes, AdminRoutes } from './modules';

const app = express();

/* Database Setup */
dbConfig();

/* Middlewares */
middlewaresConfig(app);

//Seting up a headers for every request - Handling CORS
headers(app);

/** Setting up the routes */
app.use('/api', [QuoteRoutes]);
app.use('/admin', [AdminRoutes]);

/*Author license */
author('Amel Muminovic');

const PORT = process.env.PORT || 3001;

app.listen(PORT, err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('The server is running on port ', PORT);
    }
})