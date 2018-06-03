const express = require('express');
const router = express.Router();
const convertImage = require('../middlewares/convertImage');

const path = 'public/img/';

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


            let user_id = req.body.clan_id;

            let user_dir = path + user_id;

            //shrani v datoteko z imenom user_id, sliko poimenuj glede na id in timestamp
            //če ne obstaja jo kreiraj
            if (!fs.existsSync(user_dir)) {
                fs.mkdirSync(user_dir);
                await convertImage.base64ToImg(req.body.data, user_dir, user_id + "_" + new Date().getTime());
            }
            else {
                await convertImage.base64ToImg(req.body.data, user_dir, user_id + "_" + new Date().getTime());
            }

            res.json("Success");
        } catch (error) {
            console.log(error.toString());
            res.status(500).json(error);
        }
    });

module.exports = router;