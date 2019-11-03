# ビルド環境
FROM node:lts-alpine as build-stage

ARG APP_NAME
ARG REPOSITORY_URL

COPY . /src/

WORKDIR /src/

RUN npm install && \
    APP_NAME=${APP_NAME} REPOSITORY_URL=${REPOSITORY_URL} npm run generate 

# 本番環境
FROM nginx as production-stage

ARG APP_NAME

# HTMLファイル
COPY  --from=build-stage ./src/dist/ /usr/share/nginx/html/${APP_NAME}

# NGINX設定ファイル
COPY ./default.conf.ssl.template /etc/nginx/conf.d/default.conf.template

# 起動
CMD ["/bin/bash", "-c", "envsubst '$$APP_NAME$$REPOSITORY_URL$$WEB_SERVER_PORT$$SSL_CERT_PATH$$SSL_KEY_PATH' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
