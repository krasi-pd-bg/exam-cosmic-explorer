import { Router } from 'express';
import planetService from '../services/planetService.js';

import { getErrorMessage } from '../utils/errorUtils.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const catalogController = Router();

catalogController.get('/', async (req, res) => {
    const planets = await planetService.getAll();
    res.render('planet/catalog', { planets, title: 'Catalog Page' });
});

catalogController.get('/create', isAuth, (req, res) => {
    res.render('planet/create', { title: 'Create Page' });
});

catalogController.post('/create', isAuth, async (req, res) => {
    const planetData = req.body;
    const userId = req.user._id;

    try {
        await planetService.create(planetData, userId);
        res.redirect('/catalog');
    } catch (err) {
        const error = getErrorMessage(err);
        res.render('planet/create', { planet: planetData, error, title: 'Create Page' });
    }
});

catalogController.get('/search', async (req, res) => {
    const query = req.query;
    const planets = await planetService.getAll(query).lean();
    res.render('planet/search', {title: 'Search Page', planets, query});
});

catalogController.get('/:planetId/details', async (req, res) => {
    const planet = await planetService.getOne(req.params.planetId).lean();
    const isOwner = planet.owner.toString() == req.user?._id;
    const isVoted = planet.likedList?.some(userId => userId == req.user?._id);

    res.render('planet/details', { planet, title: 'Details Page', isOwner, isVoted });
});

catalogController.get('/:planetId/vote', async (req, res) => {
    const planetId = req.params.planetId;
    const userId = req.user._id;
    try {
        await planetService.vote(planetId, userId);
        res.redirect(`/catalog/${planetId}/details`);
    } catch (err) {
        const error = getErrorMessage(err);
        console.log(error);        
    }
});

catalogController.get('/:planetId/delete', async (req, res) => {
    try {
        await planetService.remove(req.params.planetId);
        res.redirect('/catalog');
    } catch (error) {
        console.log(error);
    }
});

catalogController.get('/:planetId/edit', async (req, res) => {
    const planet  = await planetService.getOne(req.params.planetId).lean();

    res.render('planet/edit', { title: 'Edit Page', planet});
});

catalogController.post('/:planetId/edit', async (req, res) => {
    const planetData = req.body;
    const planetId = req.params.planetId;
    
try {
    await planetService.edit(planetId, planetData);
    res.redirect(`/catalog/${planetId}/details`);
} catch (err) {
    const error = getErrorMessage(err);
    res.render('planet/edit', { title: 'Edit Page', planet: volcanoData, error});
}
});

export default catalogController;