const db = require('./knexModel');

LovskaDruzina = db.LovskaDruzina;

async function getLovskeDruzine () {
    return await new LovskaDruzina().fetchAll({withRelated:['clani.porocila.aktivnosti', 'koordinatePodrocja']});
}
async function getLovskaDruzinaById(id){
    return await new LovskaDruzina().where({id: id}).fetch({withRelated:['clani.porocila.aktivnosti', 'koordinatePodrocja']});
}

async function saveLovskaDruzina(novaLovskaDruzina){
    return await new LovskaDruzina().save(novaLovskaDruzina);
}

async function updateLovskaDruzina(id, lovskaDruzina){
    return await new LovskaDruzina({id: id}).save(lovskaDruzina);
}

async function deleteLovskaDruzina(id){
    await LovskaDruzina.forge({id: id}).destroy();
}

module.exports.getLovskeDruzine = getLovskeDruzine;
module.exports.getLovskaDruzinaById = getLovskaDruzinaById;
module.exports.saveLovskaDruzina = saveLovskaDruzina;
module.exports.updateLovskaDruzina = updateLovskaDruzina;
module.exports.deleteLovskaDruzina = deleteLovskaDruzina;
