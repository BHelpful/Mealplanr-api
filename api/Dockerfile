FROM node:16.3.0

WORKDIR /api

COPY package*.json ./

RUN yarn install 

COPY . .

ENV PORT=1337

EXPOSE 1337

CMD ["yarn", "start"]

