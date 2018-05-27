const express = require('express');
const router = express.Router();
const koordinatePodrocjaDAO = require('../dao/koordinatePodrocjaDAO');
const lovskaDruzinaDAO = require ('../dao/lovskaDruzinaDAO');

//GET ALL
router.route('/')
    .get(async(req, res, next) => {
        try {
            const koordinatePodrocja = await koordinatePodrocjaDAO.getKoordinatePodrocja();
            res.json(koordinatePodrocja.serialize());
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
                const koordinatePodrocja = await koordinatePodrocjaDAO.getKoordinatePodrocjaById(idSt);
                res.json(koordinatePodrocja.serialize());
            }
        } catch (error) {
            res.status(500).json(error);
        }
    });

//PUT
router.route('/:id')
    .put(async (req, res, next) => {
        let idSt = req.params.id;
        if (!isNaN(idSt)) {
            try {
                let koordinatePodrocja = await koordinatePodrocjaDAO.getKoordinatePodrocjaById(idSt);
                if (koordinatePodrocja === null) {
                    koordinatePodrocja = await koordinatePodrocjaDAO.saveKoordinatePodrocja(req.body);
                    res.json(koordinatePodrocja.serialize());
                } else {
                    koordinatePodrocja = await koordinatePodrocjaDAO.updateKoordinatePodrocja(idSt, req.body);
                    res.json(koordinatePodrocja.serialize());
                }
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
            res.status(500).send(`Internal server error: ${idSt}`);
        }
    });

//POST
router.route('/')
    .post(async (req, res, next) => {
        try {
            const koordinatePodrocja = await koordinatePodrocjaDAO.saveKoordinatePodrocja(req.body);
            res.json(koordinatePodrocja.serialize());
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
                await koordinatePodrocjaDAO.deleteKoordinatePodrocja(idSt);
                res.json('Koordinate izbrisane');
            } catch (error) {
                res.status(500).json(error);
            }
        }
    });


module.exports = router;