const express = require('express');
const router = express.Router();
const porociloDAO = require('../dao/porociloDAO');
const aktivnostDAO = require('../dao/aktivnostDAO');

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


/*


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
 */

//POST
router.route('/')
    .post(async (req, res, next) => {
        try {
            let porociloTemp = {
                naziv: req.body.naziv,
                datum_vnos: new Date(req.body.datum_vnos).toISOString().slice(0, 19).replace('T', ' '),
                clan_id: req.body.clan_id
            };

            if(req.body.aktivnosti.length > 0){
                let porocilo = await porociloDAO.savePorocilo(porociloTemp);
                id_porocilo = porocilo.id;

                for(let newaktivnost of req.body.aktivnosti){
                    newaktivnost.datum_vnos = new Date(req.body.datum_vnos).toISOString().slice(0, 19).replace('T', ' ');
                    newaktivnost.porocilo_id = id_porocilo;
                    await aktivnostDAO.saveAktivnost(newaktivnost);
                }
                porocilo = await porociloDAO.getPorociloById(id_porocilo);
                res.status(200).json(porocilo.serialize());
            } else {
                porocilo = await porociloDao.save(porociloTemp);
                res.status(200).json(porocilo.serialize());
            }
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
                    req.body.datum_vnos = new Date(req.body.datum_vnos).toISOString().slice(0, 19).replace('T', ' ');
                    porocilo = await porociloDAO.savePorocilo(req.body);
                    res.json(porocilo.serialize());
                } else {
                    req.body.datum_vnos = new Date(req.body.datum_vnos).toISOString().slice(0, 19).replace('T', ' ');
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