FROM node:14.20.0-alpine3.16

WORKDIR /usr/app

COPY package.json .

RUN npm install && npm cache clean --force

ENV HOST=0.0.0.0
ENV PORT=5000

EXPOSE 5000

COPY . .

CMD ["npm", "run", "start"]