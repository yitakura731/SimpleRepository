const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const Puid = require('puid');
const i18next = require('i18next');
const Database = require('./database');
const util = require('../helper/util');

const database = new Database();

const Space = mongoose.model('spaces');
const Document = mongoose.model('documents');
const Tag = mongoose.model('tags');

module.exports = class Repository {
  constructor(docFileRoot, spaceFileRoot) {
    util.checkEmpty(docFileRoot, i18next.t('nullContentsStorage'));
    util.checkEmpty(spaceFileRoot, i18next.t('nullSpaceStorage'));
    this.docFileRoot = docFileRoot;
    this.spaceFileRoot = spaceFileRoot;
    database
      .connect()
      .then(() => {
        console.log('Connected to mongodb successfully');
      })
      .catch(err => {
        console.log(err);
      });
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
    let query = null;
    if (id != null) {
      database.checkId(id, i18next.t('invalidSpaceId'));
      query = Document.find({ space: id });
    } else {
      query = Document.find({});
    }
    const result = await query
      .populate('tag')
      .sort({ createDate: -1 })
      .exec();
    const documents = [];
    result.forEach(doc => {
      documents.push({
        docId: doc._id,
        docName: doc.name,
        tagId: doc.tag._id
      });
    });
    return documents;
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
    const result = await Tag.find().exec();
    const retVal = [];
    result.forEach(e => {
      retVal.push({
        id: e._id,
        name: e.name,
        color: e.color
      });
    });
    return retVal;
  }

  async getSpaces(q) {
    let query = null;
    if (q !== null) {
      query = Space.find({ spaceName: new RegExp(`.*${q}.*`) });
    } else {
      query = Space.find({});
    }
    const result = await query.sort({ createDate: -1 }).exec();
    const retVal = [];
    result.forEach(e => {
      let filePath = null;
      if (e.fileName !== null && e.fileName !== '') {
        filePath = path.join(this.spaceFileRoot, e.fileName);
      } else {
        filePath = path.join(this.spaceFileRoot, 'default.png');
      }
      const data = fs.readFileSync(filePath, 'Base64');
      retVal.push({
        id: e._id,
        name: e.spaceName,
        image: data
      });
    });
    return retVal;
  }
};
