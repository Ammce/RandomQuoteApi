import { Router } from 'express';

import * as AdminController from './controller';
import isAdmin from '../../config/auth';

const router = new Router();

router.get('/', isAdmin, AdminController.adminHomePage);
router.post('/signup', AdminController.signUp);
router.post('/login', AdminController.logIn);
router.delete('/delete/:quoteID', isAdmin, AdminController.deleteQuote);

export default router