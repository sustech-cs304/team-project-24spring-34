FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm install

COPY . .

EXPOSE 3000

CMD [ "pnpm", "start" ]