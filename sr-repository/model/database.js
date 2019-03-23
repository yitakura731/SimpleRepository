const mongoose = require('mongoose');
const config = require('config');

/* eslint prefer-destructuring: "off" */
module.exports = class Database {
  constructor() {
    const Schema = mongoose.Schema;
    const SpaceSchema = new Schema({
      _id: Schema.Types.ObjectId,
      spaceName: String,
      createDate: Date,
      fileName: String
    });
    const TagSchema = new Schema({
      _id: Schema.Types.ObjectId,
      name: String,
      createDate: Date,
      color: String
    });
    const DocumentSchema = new Schema({
      _id: Schema.Types.ObjectId,
      name: String,
      tag: { type: Schema.Types.ObjectId, ref: 'tags' },
      createDate: Date,
      space: { type: Schema.Types.ObjectId, ref: 'spaces' },
      filename: String,
      mimetype: String
    });
    mongoose.model('spaces', SpaceSchema, 'spaces');
    mongoose.model('documents', DocumentSchema, 'documents');
    mongoose.model('tags', TagSchema, 'tags');
  }

  connect() {
    mongoose.Promise = global.Promise;
    const url = `${config.get('dbServerURL')}/${config.get('dbName')}`;
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
};
