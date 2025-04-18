FROM node:18-alpine as deps

WORKDIR /app

COPY package*.json ./

COPY pnpm*.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm build

ENV PORT=3000

CMD ["pnpm", "start"]

