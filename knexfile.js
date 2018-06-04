// Update with your config settings.

module.exports = {

    development:{
        client: 'mysql',
        connection: {
            host: 'us-cdbr-iron-east-04.cleardb.net',
            user: 'b6a81d3750d45b',
            password: '267b9504',
            database: 'heroku_c24dd51f85f709d'
        },
        migrations:{
            tableName: 'migrations'
        }
    },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
