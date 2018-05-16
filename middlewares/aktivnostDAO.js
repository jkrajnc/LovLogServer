const db = require('./knexModel');

Aktivnost = db.Aktivnost;

async function getAktivnosti () {
    return await new Aktivnost().fetchAll();
}
async function getAktivnostById(id){
    return await new Aktivnost().where({id: id}).fetch();
}

async function saveAktivnost(novAktivnost){
    return await new Aktivnost().save(novAktivnost);
}

async function updateAktivnost(id, aktivnost){
    return await new Aktivnost({id: id}).save(aktivnost);
}

async function deleteAktivnost(id){
    await Aktivnost.forge({id: id}).destroy();
}

module.exports.getAktivnosti = getAktivnosti;
module.exports.getAktivnostById = getAktivnostById;
module.exports.saveAktivnost = saveAktivnost;
module.exports.updateAktivnost = updateAktivnost;
module.exports.deleteAktivnost = deleteAktivnost;