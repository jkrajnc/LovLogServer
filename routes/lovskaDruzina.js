const express = require('express');
const router = express.Router();
const lovskaDruzinaDao = require('../dao/lovskaDruzinaDAO');
const koordinatePodrocjaDAO = require('../dao/koordinatePodrocjaDAO');

//GET ALL
router.route('/')
    .get(async(req, res, next) => {
        try {
            const lovskeDruzine = await lovskaDruzinaDao.getLovskeDruzine();
            res.json(lovskeDruzine.serialize());
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
                const lovskaDruzina = await lovskaDruzinaDao.getLovskaDruzinaById(idSt);
                res.json(lovskaDruzina.serialize());
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
                let lovskaDruzina = await lovskaDruzinaDao.getLovskaDruzinaById(idSt);
                if (lovskaDruzina === null) {
                    lovskaDruzina = await lovskaDruzinaDao.saveLovskaDruzina(req.body);
                    res.json(lovskaDruzina.serialize());
                } else {
                    lovskaDruzina = await lovskaDruzinaDao.updateLovskaDruzina(idSt, req.body);
                    res.json(lovskaDruzina.serialize());
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
            const lovskaDruzina = await lovskaDruzinaDao.saveLovskaDruzina(req.body);
            res.json(lovskaDruzina.serialize());
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
                await lovskaDruzinaDao.deleteLovskaDruzina(idSt);
                const lovskeDruzine = await lovskaDruzinaDao.getLovskeDruzine();
                res.json(lovskeDruzine.serialize());
            } catch (error) {
                res.status(500).json(error);
            }
        }
    });

//POST koordinate področja
router.route('/:idDruzina/koordinatePodrocja/')
    .post(async (req, res, next) => {
        let idDruzina = req.params.idDruzina;
        try {
            req.body.lovska_druzina_id = idDruzina;
            const koordinatePodrocja = await koordinatePodrocjaDAO.saveKoordinatePodrocja(req.body);
            res.json(koordinatePodrocja.serialize());
        } catch (error) {
            console.log(error.toString());
            res.status(500).json(error);
        }
    });


module.exports = router;