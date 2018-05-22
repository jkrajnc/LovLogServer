const express = require('express');
const router = express.Router();
const clanDAO = require('../middlewares/clanDAO');

//GET ALL
router.route('/')
    .get(async(req, res, next) => {
        try {
            const clani = await clanDAO.getClani();
            res.json(clani.serialize());
        } catch(error){
            res.status(500).json(error);
        }
    });

//GET
router.route('/:id')
    .get(async (req, res, next) => {
        const idSt = req.params.id;
        try {
            if (isNaN(idSt)) {
                res.status(500).send(`Internal server error: ${idSt}`);
            } else {
                const clani = await clanDAO.getClanById(idSt);
                res.json(clani.serialize());
            }
        } catch (error) {
            res.status(500).json(error);
        }
    });


//Get by id druzina
router.route('/lovske_druzine/:id')
    .get(async (req, res, next) => {
        const idSt = req.params.id;
        try {
            if (isNaN(idSt)) {
                res.status(500).send(`Internal server error: ${idSt}`);
            } else {

                const clani = await clanDAO.getClaniByLovskaDruzinaId(idSt);
                res.json(clani.serialize());
            }
        } catch (error) {
            res.status(500).json(error);
        }
    });

//POST
router.route('/')
    .post(async (req, res, next) => {
        try {
            const clan = await clanDAO.saveClan(req.body);
            res.json(clan.serialize());
        } catch (error) {
            console.log(error.toString());
            res.status(500).json(error);
        }
    });

//DELETE
router.route('/:id')
    .delete(async (req, res, next) => {
        let idSt = req.params.id;
        if (isNaN(idSt)) {
            res.status(500).send(`Internal server error: ${idSt}`);
        } else {
            try {
                await clanDAO.deleteClan(idSt);
                const clani = await clanDAO.getClani();
                res.json(clani.serialize());
            } catch (error) {
                res.status(500).json(error);
            }
        }
    });

//PUT
router.route('/:id')
    .put(async (req, res, next) => {
        let idSt = req.params.id;
        if (!isNaN(idSt)) {
            try {
                let clan = await clanDAO.getClanById(idSt);
                if (clan === null) {
                    clan = await clanDAO.saveClan(req.body);
                    res.json(clan.serialize());
                } else {
                    clan = await clanDAO.updateClan(idSt, req.body);
                    res.json(clan.serialize());
                }
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
            res.status(500).send(`Internal server error: ${idSt}`);
        }
    });


module.exports = router;