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
            await convertImage.base64ToImg(req.body.data, "public/img", "test");
            res.json("Success");
        } catch (error) {
            console.log(error.toString());
            res.status(500).json(error);
        }
    });

module.exports = router;