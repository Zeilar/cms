FROM node:16-alpine as build

WORKDIR /usr/src/app

COPY dist/apps/frontend .

RUN npm i

FROM node:16-alpine as main

COPY --from=build /usr/src/app /usr/src/app

WORKDIR /usr/src/app

CMD ["npm", "start"]
