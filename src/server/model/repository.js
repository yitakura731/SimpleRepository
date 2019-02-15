const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const Puid = require('puid');
const i18next = require('i18next');
const Database = require('./database');
const util = require('./util');

const database = new Database();

const Space = mongoose.model('spaces');
const Document = mongoose.model('documents');
const Tag = mongoose.model('tags');

module.exports = class Repository {
  constructor(docFileRoot, spaceFileRoot) {
    this.docFileRoot = docFileRoot;
    this.spaceFileRoot = spaceFileRoot;
    database.connect();
  }

  async postDocumet(spaceId, tagId, name, file) {
    util.checkEmpty(spaceId, i18next.t('nullSpaceId'));
    util.checkEmpty(tagId, i18next.t('nullTagId'));
    util.checkEmpty(name, i18next.t('nullName'));
    util.checkNull(name, i18next.t('nullFile'));
    database.checkId(spaceId, i18next.t('invalidSpaceId'));
    database.checkId(tagId, i18next.t('invalidTagId'));
    const puid = new Puid(false);
    const storeFileName = puid.generate();
    return fse.writeFile(path.join(this.docFileRoot, storeFileName), file.buffer).then(() => {
      const document = new Document({
        _id: new mongoose.Types.ObjectId(),
        name,
        tag: tagId,
        filename: storeFileName,
        mimetype: file.mimetype,
        createDate: new Date(),
        space: spaceId
      });
      return document.save();
    });
  }

  async postSpace(name, file) {
    util.checkEmpty(name, i18next.t('nullName'));
    if (file != null) {
      const puid = new Puid(false);
      const storeFileName = `${puid.generate()}.png`;
      return fse.writeFile(path.join(this.spaceFileRoot, storeFileName), file.buffer).then(() => {
        const space = new Space({
          _id: new mongoose.Types.ObjectId(),
          spaceName: name,
          createDate: new Date(),
          fileName: storeFileName
        });
        return space.save();
      });
    }
    const space = new Space({
      _id: new mongoose.Types.ObjectId(),
      spaceName: name,
      createDate: new Date(),
      fileName: ''
    });
    return space.save();
  }

  async postTag(name, color) {
    util.checkEmpty(name, i18next.t('nullName'));
    util.checkEmpty(color, i18next.t('nullColor'));
    const tag = new Tag({
      _id: new mongoose.Types.ObjectId(),
      name,
      createDate: new Date(),
      color
    });
    return tag.save();
  }

  async getDocuments(id) {
    util.checkEmpty(id, i18next.t('nullSpaceId'));
    database.checkId(id, i18next.t('invalidSpaceId'));
    return Document.find({ space: id })
      .populate('tag')
      .sort({ createDate: -1 })
      .exec()
      .then(docs => {
        const documents = [];
        docs.forEach(doc => {
          const target = documents.find(item => {
            return item.tagId === doc.tag._id;
          });
          if (target == null) {
            documents.push({
              tagId: doc.tag._id,
              tagColor: doc.tag.color,
              tagName: doc.tag.name,
              docs: [
                {
                  docId: doc._id,
                  docName: doc.name
                }
              ]
            });
          } else {
            target.docs.push({
              docId: doc._id,
              docName: doc.name
            });
          }
        });
        return documents;
      });
  }

  async getContent(id) {
    util.checkEmpty(id, i18next.t('nullContentId'));
    database.checkId(id, i18next.t('invalidContentId'));
    return Document.findById(id).then(doc => {
      const filePath = path.join(this.docFileRoot, doc.filename);
      const data = fs.readFileSync(filePath);
      return data;
    });
  }

  async getTags() {
    return Tag.find().exec();
  }

  async getSpaces(name) {
    util.checkEmpty(name, i18next.t('nullName'));
    return Space.find({ spaceName: new RegExp(`.*${name}.*`) })
      .sort({ createDate: -1 })
      .exec();
  }

  async getAllSpaces() {
    return Space.find({})
      .sort({ createDate: -1 })
      .exec();
  }
};
