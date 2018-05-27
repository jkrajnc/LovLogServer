const db = require('../middlewares/knexModel');

KoordinatePodrocja = db.KoordinatePodrocja;

async function getKoordinatePodrocja () {
    return await new KoordinatePodrocja().fetchAll();
}
async function getKoordinatePodrocjaById(id){
    return await new KoordinatePodrocja().where({id: id}).fetch();
}

async function saveKoordinatePodrocja(novakoordinatePodrocja){
    return await new KoordinatePodrocja().save(novakoordinatePodrocja);
}

async function updateKoordinatePodrocja(id, koordinatePodrocja){
    return await new KoordinatePodrocja({id: id}).save(koordinatePodrocja);
}

async function deleteKoordinatePodrocja(id){
    await KoordinatePodrocja.forge({id: id}).destroy();
}

module.exports.getKoordinatePodrocja = getKoordinatePodrocja;
module.exports.getKoordinatePodrocjaById = getKoordinatePodrocjaById;
module.exports.saveKoordinatePodrocja = saveKoordinatePodrocja;
module.exports.updateKoordinatePodrocja = updateKoordinatePodrocja;
module.exports.deleteKoordinatePodrocja = deleteKoordinatePodrocja;
