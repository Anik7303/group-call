FROM node:14.20.0-alpine3.16

WORKDIR /usr/app

COPY package.json .

RUN npm install && npm cache clean --force

EXPOSE 3000

COPY . .

CMD ["npm", "run", "start"]
