FROM ghcr.io/puppeteer/puppeteer:21.6.1

USER root

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

CMD [ "node", "index.js" ]
