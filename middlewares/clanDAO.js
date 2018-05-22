const db = require('./knexModel');

Clan = db.Clan;

async function getClani () {
    return await new Clan().fetchAll({withRelated:['porocila.aktivnosti']});
}

async function getClaniByLovskaDruzinaId(id){
    return await new Clan().where({lovska_druzina_id: id}).fetchAll({withRelated:['porocila.aktivnosti']})
}

async function getClanById(id){
    return await new Clan().where({id: id}).fetch({withRelated:['porocila.aktivnosti']});
}

async function saveClan(novClan){
    return await new Clan().save(novClan);
}

async function updateClan(id, clan){
    return await new Clan({id: id}).save(clan);
}

async function deleteClan(id){
    await Clan.forge({id: id}).destroy();
}

module.exports.getClani = getClani;
module.exports.getClanById = getClanById;
module.exports.saveClan = saveClan;
module.exports.updateClan = updateClan;
module.exports.deleteClan = deleteClan;
module.exports.getClaniByLovskaDruzinaId = getClaniByLovskaDruzinaId;

