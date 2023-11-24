FROM node:21

WORKDIR /app

COPY . ./

RUN npm i
RUN cd ./frontend && npm i
RUN cd ./backend && npm i

RUN npm run build

ENV PORT=8080

EXPOSE 8080

CMD [ "npm", "start" ]