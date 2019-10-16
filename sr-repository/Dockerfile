FROM node:10.13-alpine

# ソースコードを転送
COPY . /src/

# 実行フォルダをソースにフォルダに展開
WORKDIR /src/

# NPMでインストール
RUN  npm install --production

# コンテナ起動
CMD ["sh", "-c", "npm start"]

