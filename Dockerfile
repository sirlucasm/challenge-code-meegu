###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine3.15 As development

WORKDIR /home/api

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

CMD yarn start:dev
