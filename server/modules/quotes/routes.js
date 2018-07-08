import { Router } from 'express';
import * as QuotesController from './controller';

const routes = new Router();

routes.post('/quotes', QuotesController.createQuote);
routes.get('/quotes', QuotesController.getAllQuotes);
routes.put('/quotestar', QuotesController.rateQuote);

export default routes;