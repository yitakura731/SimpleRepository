FROM mongo

# セットアップ用スクリプトを配置
COPY ./setup/init.sh /docker-entrypoint-initdb.d/

# コンテナ起動
CMD ["mongod", "--auth"]
