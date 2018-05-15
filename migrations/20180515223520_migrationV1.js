
exports.up = function(knex, Promise) {
    return knex.schema.createTable('lovska_druzina', (table) => {
        table.increments('id').primary();
        table.string('naziv');

    }).createTable('koordinate_podrocja', (table) => {
        table.increments('id').primary();
        table.decimal('latitude', 11, 8);
        table.decimal('longitude', 11, 8);
        table.integer('lovska_druzina_id').unsigned()
            .references('id').inTable('lovska_druzina');

    }).createTable('clan', (table) => {
        table.increments('id').primary();
        table.string('uporabnisko_ime');
        table.string('hash_geslo');
        table.string('elektronska_posta');
        table.string('ime');
        table.string('priimek');
        table.string('vloga');
        table.string('telefonska_stevilka');
        table.integer('lovska_druzina_id').unsigned()
            .references('id').inTable('lovska_druzina');

    }).createTable('porocilo', (table) => {
        table.increments('id').primary();
        table.string('naziv');
        table.dateTime('datum_vnos');
        table.integer('clan_id').unsigned()
            .references('id').inTable('clan')


    }).createTable('aktivnost', (table) => {
        table.increments('id').primary();
        table.string('tip_aktivnost');
        table.string('naziv');
        table.dateTime('datum_vnos');
        table.decimal('latitude', 11, 8);
        table.decimal('longitude', 11, 8);
        table.string('tip_divjad');
        table.string('starostna_kategorija');
        table.string('slika_path');
        table.string('opomba');
        table.integer('porocilo_id').unsigned()
            .references('id').inTable('porocilo')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('lovska_druzina')
        .dropTable('koordinate_podrocja')
        .dropTable('clan')
        .dropTable('porocilo')
        .dropTable('aktivnost')
};
