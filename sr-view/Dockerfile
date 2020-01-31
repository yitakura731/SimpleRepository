# ビルド環境
FROM node:lts-alpine as build-stage

ARG REPOSITORY_URL
ARG AUTH_URL

COPY . /src/

WORKDIR /src/

RUN npm install && REPOSITORY_URL=${REPOSITORY_URL} AUTH_URL=${AUTH_URL} npm run generate 

# 本番環境
FROM nginx as production-stage

# HTMLファイル
COPY  --from=build-stage ./src/dist/ /usr/share/nginx/html/SimpleRepository

# NGINX設定ファイル
COPY ./default.conf.ssl.template /etc/nginx/conf.d/default.conf.template

# 起動
CMD ["/bin/bash", "-c", "envsubst '$$AUTH_URL$$REPOSITORY_URL$$SSL_CERT_PATH$$SSL_KEY_PATH' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
