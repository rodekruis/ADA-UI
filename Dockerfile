FROM node:14-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci --no-audit

COPY . .

CMD npm run build
