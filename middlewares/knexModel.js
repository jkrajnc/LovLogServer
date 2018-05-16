const dbConfig = require('../knexfile');
const config = dbConfig.development;
const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);
const cascadeDelete = require('bookshelf-cascade-delete');

bookshelf.plugin(cascadeDelete);

const LovskaDruzina = bookshelf.Model.extend({
    tableName:'lovska_druzina',
    idAttribute:'id',
    clani:function(){
        return this.hasMany(Clan);
    },
    koordinatePodrocja:function () {
        return this.hasMany(KoordinatePodrocja)
    }
}, {
    dependents: ['clani', 'koordinatePodrocja']
});

const KoordinatePodrocja = bookshelf.Model.extend({
    tableName:'koordinate_podrocja',
    idAttribute:'id',
    lovskaDruzina: function(){
        return this.belongsTo(LovskaDruzina)
    }
});

const Clan = bookshelf.Model.extend({
    tableName:'clan',
    idAttribute:'id',
    lovskaDruzina: function(){
        return this.belongsTo(LovskaDruzina)
    },
    porocila: function(){
        return this.hasMany(Porocilo)
    }

}, {
    dependents: ['porocila']
});

const Porocilo = bookshelf.Model.extend({
    tableName:'porocilo',
    idAttribute:'id',
    clan: function(){
        return this.belongsTo(Clan)
    },
    aktivnosti: function(){
        return this.hasMany(Aktivnost)
    }

}, {
    dependents: ['aktivnosti']
});

const Aktivnost = bookshelf.Model.extend({
    tableName:'aktivnost',
    idAttribute:'id',

    porocilo: function () {
        return this.belongsTo(Porocilo)
    }
});

module.exports.LovskaDruzina = LovskaDruzina;
module.exports.KoordinatePodrocja = KoordinatePodrocja;
module.exports.Clan = Clan;
module.exports.Porocilo = Porocilo;
module.exports.Aktivnost = Aktivnost;



