var base64Img = require('base64-img');

async function base64ToImg(data, path, fileName){
    base64Img.img(data, path, fileName, function(err, filepath) {});
}

async function imgToBase64(path){
    return base64Img.base64Sync(path, function(err, data) {});
}

module.exports.base64ToImg = base64ToImg;
module.exports.imgToBase64 = imgToBase64;