const mongoose = require('mongoose');
require('dotenv').config({ path: './rep.env' });

/* eslint prefer-destructuring: "off" */
class Database {
  constructor() {
    const Schema = mongoose.Schema;
    /** Space */
    const SpaceSchema = new Schema({
      _id: Schema.Types.ObjectId,
      userId: Number,
      spaceName: String,
      createDate: Date,
      fileName: String
    });
    /** Tag */
    const TagSchema = new Schema({
      _id: Schema.Types.ObjectId,
      userId: Number,
      name: String,
      createDate: Date,
      color: String
    });
    /** Document */
    const DocumentSchema = new Schema({
      _id: Schema.Types.ObjectId,
      name: String,
      userId: Number,
      tagId: Schema.Types.ObjectId,
      createDate: Date,
      spaceId: Schema.Types.ObjectId,
      filename: String,
      thumbnailName: String,
      mimetype: String
    });
    mongoose.model('spaces', SpaceSchema, 'spaces');
    mongoose.model('documents', DocumentSchema, 'documents');
    mongoose.model('tags', TagSchema, 'tags');
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
