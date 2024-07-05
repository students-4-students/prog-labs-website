FROM node:22-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn run build
CMD [ "yarn", "run", "start" ]
