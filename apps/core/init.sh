npm i -g knex

cd /usr/src/app

knex --knexfile knexfile.ts migrate:latest
knex --knexfile knexfile.ts seed:run

node main.js
