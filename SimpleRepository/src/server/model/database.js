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
    console.log('Connect database start');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.get('dburl'), err => {
      if (err) {
        console.log('connection Error!');
        console.log(err);
      } else {
        console.log('connection success!');
      }
    });
  }

  checkId(target, message) {
    if (!mongoose.Types.ObjectId.isValid(target)) {
      throw new TypeError(`${message}:${target}`);
    }
  }
};
