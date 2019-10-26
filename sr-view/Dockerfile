# ビルド環境
FROM node:lts-alpine as build-stage

ARG APP_NAME

COPY . /src/

WORKDIR /src/

RUN npm install && \
    APP_NAME=${APP_NAME} REPOSITORY_URL=http://sr-rep:3000 npm run generate 

# 本番環境
FROM nginx as production-stage

ARG APP_NAME

# HTMLファイル
COPY  --from=build-stage ./src/dist/ /usr/share/nginx/html/${APP_NAME}

# NGINX設定ファイル
COPY ./default.conf.template /etc/nginx/conf.d/default.conf.template

# 起動
CMD ["/bin/bash", "-c", "envsubst '$$APP_NAME$$REPOSITORY_URL$$WEB_SERVER_PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
