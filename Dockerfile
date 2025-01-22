FROM node:20.15.1-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm install --force

COPY . ./

#RUN npx prisma db push

RUN npm run build

ENV PORT=3333

EXPOSE $PORT

CMD ["node", "build/shared/infra/server.js"]