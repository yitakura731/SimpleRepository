const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

/* eslint prefer-destructuring: "off" */
class Database {
  constructor() {
    const Schema = mongoose.Schema;
    /** User */
    const UserSchema = new Schema({
      _id: Schema.Types.ObjectId,
      strategy: String,
      localId: String,
      githubId: String,
      facebookId: String,
      username: String,
      password: String
    });
    /** Space */
    const SpaceSchema = new Schema({
      _id: Schema.Types.ObjectId,
      userId: Schema.Types.ObjectId,
      spaceName: String,
      createDate: Date,
      fileName: String
    });
    /** Tag */
    const TagSchema = new Schema({
      _id: Schema.Types.ObjectId,
      userId: Schema.Types.ObjectId,
      name: String,
      createDate: Date,
      color: String
    });
    /** Document */
    const DocumentSchema = new Schema({
      _id: Schema.Types.ObjectId,
      name: String,
      userId: Schema.Types.ObjectId,
      tagId: Schema.Types.ObjectId,
      createDate: Date,
      spaceId: Schema.Types.ObjectId,
      filename: String,
      mimetype: String
    });
    mongoose.model('spaces', SpaceSchema, 'spaces');
    mongoose.model('documents', DocumentSchema, 'documents');
    mongoose.model('tags', TagSchema, 'tags');
    mongoose.model('users', UserSchema, 'users');
  }

  connect() {
    mongoose.Promise = global.Promise;
    const url = `mongodb://${process.env.DB_APP_USER_NAME}:${process.env.DB_APP_USER_PASSWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    return mongoose.connect(url, { useNewUrlParser: true });
  }

  getConnection() {
    return mongoose.createConnection();
  }

  checkId(target, message) {
    if (!mongoose.Types.ObjectId.isValid(target)) {
      throw new TypeError(`${message}:${target}`);
    }
  }
}

module.exports = new Database();
