FROM node:20.12.2-alpine3.19

RUN apk update && apk add git tzdata && mkdir /app

RUN cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

RUN echo "America/Sao_Paulo" >  /etc/timezone

RUN apk del tzdata

WORKDIR /app

COPY . /app/

RUN yarn install --frozen-lockfile

RUN yarn build

EXPOSE 3000

ENTRYPOINT [ "yarn", "start:prod" ]