FROM node:16-alpine as build

WORKDIR /usr/src/app

COPY dist/apps/core .
COPY apps/core/init.sh .
COPY apps/core/src/core/db/migrations src/core/db/migrations
COPY apps/core/knexfile.ts .
COPY apps/core/.env .

RUN npm i

RUN npm i pg ts-node

FROM node:16-alpine as main

COPY --from=build /usr/src/app /usr/src/app

WORKDIR /usr/src/app

CMD ["sh", "init.sh"]
