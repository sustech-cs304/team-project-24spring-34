FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm install

COPY . .

EXPOSE 8080

CMD [ "pnpm", "start" ]