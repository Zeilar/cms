npm i -g knex

cd /usr/src/app

knex --knexfile knexfile.ts migrate:latest

node main.js
