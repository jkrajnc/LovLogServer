const db = require('./knexModel');

Porocilo = db.Porocilo;

async function getPorocila () {
    return await new Porocilo().fetchAll({withRelated:['aktivnosti']});
}
async function getPorociloById(id){
    return await new Porocilo().where({id: id}).fetch({withRelated:['aktivnosti']});
}

async function savePorocilo(novPorocilo){
    return await new Porocilo().save(novPorocilo);
}

async function updatePorocilo(id, porocilo){
    return await new Porocilo({id: id}).save(porocilo);
}

async function deletePorocilo(id){
    await Porocilo.forge({id: id}).destroy();
}

module.exports.getPorocila = getPorocila;
module.exports.getPorociloById = getPorociloById;
module.exports.savePorocilo = savePorocilo;
module.exports.updatePorocilo = updatePorocilo;
module.exports.deletePorocilo = deletePorocilo;