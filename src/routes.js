import { Router } from "express";

import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import catalogController from "./controllers/catalogController.js";

const router = Router();

router.use(homeController);
router.use('/auth', authController);
router.use('/catalog', catalogController);





router.all('*', (req, res) => {
    res.render('404', {title: '404'});
});


export default router;