mongo <<EOF
use $MONGO_INITDB_DATABASE

db.createUser({
  user: '$DB_APP_USER_NAME',
  pwd: '$DB_APP_USER_PASSWD',
  roles: [{
    role: 'dbOwner',
    db: '$MONGO_INITDB_DATABASE'
  }]
})

db.createCollection("documents")

db.createCollection("tags")

db.createCollection("spaces")

EOF
