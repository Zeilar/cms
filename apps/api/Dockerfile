FROM node:16-alpine as build

WORKDIR /usr/src/app

COPY apps/api/init.sh .
COPY dist/apps/api .
COPY apps/api/src/db/migrations src/db/migrations
COPY apps/api/knexfile.ts .
COPY apps/api/.env .
COPY package.json .

RUN npm i

FROM node:16-alpine as main

COPY --from=build /usr/src/app /usr/src/app

WORKDIR /usr/src/app

CMD ["sh", "init.sh"]
