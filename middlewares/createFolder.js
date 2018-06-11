const fs = require('fs');

const path = "public/img/"

module.exports = function (user_id) {

    let user_dir = path + user_id;

    if (!fs.existsSync(user_dir)) {
        fs.mkdirSync(user_dir);
    }
    else {
        console.log("Mape ni mogoče kreirati, preveri pravice!")
    }

}