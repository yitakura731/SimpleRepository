# ベースイメージを指定
FROM nginx
ARG APP_NAME

# NGINXの設定ファイルを配備
COPY ./dist/ /usr/share/nginx/html/${APP_NAME}
COPY ./default.conf.template /etc/nginx/conf.d/default.conf.template
