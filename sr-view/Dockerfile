# ベースイメージを指定
FROM nginx

ARG APP_NAME

# HTMLファイル
COPY ./dist/ /usr/share/nginx/html/${APP_NAME}

# サーバー証明書
COPY ./keys/view-server.crt /etc/pki/tls/certs/view-server.crt

# 秘密鍵
COPY ./keys/view-server.key /etc/pki/tls/private/view-server.key

# NGINX設定ファイル
COPY ./default.conf.template /etc/nginx/conf.d/default.conf.template
