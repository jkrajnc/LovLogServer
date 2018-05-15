const dbConfig = require('../dbConfig');
const config = dbConfig.development;
const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);
const cascadeDelete = require('bookshelf-cascade-delete');

bookshelf.plugin(cascadeDelete);


//TODO DEPENDENTS
const LovskaDruzina = bookshelf.Model.extend({
    tableName:'lovska_druzina',
    idAttribute:'id',
    clani:function(){
        return this.hasMany(Clan);
    },
    koordinatePodrocja:function () {
        return this.hasMany(KoordinatePodrocja)
    }
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

});

const Aktivnost = bookshelf.Model.extend({
    tableName:'aktivnost',
    idAttribute:'id',

    porocilo: function () {
        return this.belongsTo(Porocilo)
    }
});

