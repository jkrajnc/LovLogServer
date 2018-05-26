const express = require('express');
const router = express.Router();
const porociloDAO = require('../dao/porociloDAO');

//GET ALL
router.route('/')
    .get(async(req, res, next) => {
        try {
            const porocila = await porociloDAO.getPorocila();
            res.json(porocila.serialize());
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
                const porocilo = await porociloDAO.getPorociloById(idSt);
                res.json(porocilo.serialize());
            }
        } catch (error) {
            res.status(500).json(error);
        }
    });

//GetPorociloByIdClan
//Get by id druzina
router.route('/clani/:id')
    .get(async (req, res, next) => {
        const idSt = req.params.id;
        try {
            if (isNaN(idSt)) {
                res.status(500).send(`Internal server error: ${idSt}`);
            } else {

                const porocila = await porociloDAO.getPorocilaByIdClan(idSt);
                res.json(porocila.serialize());
            }
        } catch (error) {
            res.status(500).json(error);
        }
    });

//POST
router.route('/')
    .post(async (req, res, next) => {
        try {
            const porocilo = await porociloDAO.savePorocilo(req.body);
            res.json(porocilo.serialize());
        } catch (error) {
            console.log(error.toString());
            res.status(500).json(error);
        }
    });

//PUT
router.route('/:id')
    .put(async (req, res, next) => {
        let idSt = req.params.id;
        if (!isNaN(idSt)) {
            try {
                let porocilo = await porociloDAO.getPorociloById(idSt);
                if (porocilo === null) {
                    porocilo = await porociloDAO.savePorocilo(req.body);
                    res.json(porocilo.serialize());
                } else {
                    porocilo = await porociloDAO.updatePorocilo(idSt, req.body);
                    res.json(porocilo.serialize());
                }
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
            res.status(500).send(`Internal server error: ${idSt}`);
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
                await porociloDAO.deletePorocilo(idSt);
                const porocilo = await porociloDAO.getPorocila();
                res.json(porocilo.serialize());
            } catch (error) {
                res.status(500).json(error);
            }
        }
    });


module.exports = router;