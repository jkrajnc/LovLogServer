const express = require('express');
const router = express.Router();
const convertImage = require('../middlewares/convertImage');

router.route('/')
    .get(async(req, res, next) => {
        try {
            const data = await convertImage.imgToBase64("public/img/logo.png");
            console.log(data);
        } catch(error){
            res.status(500).json(error);
        }
    });

    router.route('/')
    .post(async (req, res, next) => {
        try {
            const user_id = req.body.clan_id
            //shrani v datoteko z imenom user_id, sliko poimenuj glede na id in timestamp
            await convertImage.base64ToImg(req.body.data, "public/img/"+ user_id, user_id + "_" + new Date().getTime());
            res.json("Success");
        } catch (error) {
            console.log(error.toString());
            res.status(500).json(error);
        }
    });

module.exports = router;