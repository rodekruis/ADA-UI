FROM node:16-alpine

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci --no-audit

COPY . .

CMD npm run build
