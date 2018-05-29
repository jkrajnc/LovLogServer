const express = require('express');
const router = express.Router();
const aktivnostDAO = require('../dao/aktivnostDAO');

//GET ALL
router.route('/')
    .get(async(req, res, next) => {
        try {
            const aktivnost = await aktivnostDAO.getAktivnosti();
            res.json(aktivnost.serialize());
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
                const aktivnosti = await aktivnostDAO.getAktivnostById(idSt);
                res.json(aktivnosti.serialize());
            }
        } catch (error) {
            res.status(500).json(error);
        }
    });

router.route('/porocila/:id')
    .get(async (req, res, next) => {
        const idSt = req.params.id;
        try {
            if (isNaN(idSt)) {
                res.status(500).send(`Internal server error: ${idSt}`);
            } else {

                const aktivnosti = await aktivnostDAO.getAktivnostiByIdPorocilo(idSt);
                res.json(aktivnosti.serialize());
            }
        } catch (error) {
            res.status(500).json(error);
        }
    });

//POST
router.route('/')
    .post(async (req, res, next) => {
        try {
            const aktivnost = await aktivnostDAO.saveAktivnost(req.body);
            res.json(aktivnost.serialize());
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
                await aktivnostDAO.deleteAktivnost(idSt);
                res.json('Aktivnost izbrisana');
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

                let aktivnost = await aktivnostDAO.getAktivnostById(idSt);
                if (aktivnost === null) {
                    req.body.datum_vnos = new Date(req.body.datum_vnos).toISOString().slice(0, 19).replace('T', ' ');
                    aktivnost = await aktivnostDAO.saveAktivnost(req.body);
                    res.json(aktivnost.serialize());
                } else {
                    req.body.datum_vnos  = new Date(req.body.datum_vnos).toISOString().slice(0, 19).replace('T', ' ');
                    aktivnost = await aktivnostDAO.updateAktivnost(idSt, req.body);
                    res.json(aktivnost.serialize());
                }
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
            res.status(500).send(`Internal server error: ${idSt}`);
        }
    });

module.exports = router;