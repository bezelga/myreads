FROM node:10.8

ADD . /app

WORKDIR /app
EXPOSE 3000

RUN npm install
RUN yarn install

CMD npm start
