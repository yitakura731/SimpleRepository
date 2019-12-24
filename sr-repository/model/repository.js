const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const Puid = require('puid');
const i18next = require('i18next');
const Jimp = require('jimp');
const database = require('./database');
const util = require('../helper/util');

const Space = mongoose.model('spaces');
const Document = mongoose.model('documents');
const Tag = mongoose.model('tags');

module.exports = class Repository {
  constructor(docFileRoot, spaceFileRoot) {
    util.checkEmpty(docFileRoot, i18next.t('nullContentsStorage'));
    util.checkEmpty(spaceFileRoot, i18next.t('nullSpaceStorage'));
    if (!fs.existsSync(docFileRoot)) {
      fse.mkdirsSync(docFileRoot);
    }
    this.docFileRoot = docFileRoot;

    if (!fs.existsSync(spaceFileRoot)) {
      fse.mkdirsSync(spaceFileRoot);
    }
    this.spaceFileRoot = spaceFileRoot;
  }

  async postDocumet(user, spaceId, tagId, name, file) {
    util.checkEmpty(user, i18next.t('nullUser'));
    util.checkEmpty(spaceId, i18next.t('nullSpaceId'));
    util.checkEmpty(name, i18next.t('nullName'));
    util.checkNull(name, i18next.t('nullFile'));
    database.checkId(spaceId, i18next.t('invalidSpaceId'));
    if (tagId != null) {
      database.checkId(tagId, i18next.t('invalidTagId'));
    }
    util.checkFileSize(file.size);
    util.checkSupportedFormat(file.mimetype);
    const ext = util.getExtent(file.mimetype);
    const puid = new Puid(false);
    const filename = `${puid.generate()}.${ext}`;
    await fse.writeFile(path.join(this.docFileRoot, filename), file.buffer);
    let thumbnailName = null;
    if (file.mimetype === 'image/jpeg') {
      thumbnailName = `${puid.generate()}.jpg`;
      const thumbnai = await Jimp.read(path.join(this.docFileRoot, filename));
      await thumbnai.resize(100, 100);
      await thumbnai.write(path.join(this.docFileRoot, thumbnailName));
    } else {
      thumbnailName = 'pdfNail.png';
    }
    const document = new Document({
      _id: new mongoose.Types.ObjectId(),
      name,
      userId: user._id,
      tagId,
      createDate: new Date(),
      spaceId,
      filename,
      thumbnailName,
      mimetype: file.mimetype
    });
    await document.save();
    return document;
  }

  async postSpace(user, name, file) {
    util.checkEmpty(user, i18next.t('nullUser'));
    util.checkEmpty(name, i18next.t('nullName'));
    if (file != null) {
      const puid = new Puid(false);
      const storeFileName = `${puid.generate()}.png`;
      return fse.writeFile(path.join(this.spaceFileRoot, storeFileName), file.buffer).then(() => {
        const space = new Space({
          _id: new mongoose.Types.ObjectId(),
          userId: user._id,
          spaceName: name,
          createDate: new Date(),
          fileName: storeFileName
        });
        return space.save();
      });
    }
    const space = new Space({
      _id: new mongoose.Types.ObjectId(),
      userId: user._id,
      spaceName: name,
      createDate: new Date(),
      fileName: ''
    });
    return space.save();
  }

  async postTag(user, name, color) {
    util.checkEmpty(user, i18next.t('nullUser'));
    util.checkEmpty(name, i18next.t('nullName'));
    util.checkEmpty(color, i18next.t('nullColor'));
    const tag = new Tag({
      _id: new mongoose.Types.ObjectId(),
      userId: user._id,
      name,
      createDate: new Date(),
      color
    });
    return tag.save();
  }

  async getDocuments(user, spaceId, q) {
    util.checkEmpty(user, i18next.t('nullUser'));
    let query = null;
    if (spaceId != null) {
      database.checkId(spaceId, i18next.t('invalidSpaceId'));
      if (q != null) {
        query = Document.find({ spaceId, userId: user._id, name: new RegExp(`.*${q}.*`) });
      } else {
        query = Document.find({ spaceId, userId: user._id });
      }
    } else if (q != null) {
      query = Document.find({ userId: user._id, name: new RegExp(`.*${q}.*`) });
    } else {
      query = Document.find({ userId: user._id });
    }
    const result = await query.sort({ createDate: -1 }).exec();
    const documents = [];
    result.forEach(doc => {
      let nailPath = null;
      if (doc.mimetype === 'image/jpeg') {
        nailPath = path.join(this.docFileRoot, doc.thumbnailName);
      } else {
        nailPath = `assets/${doc.thumbnailName}`;
      }
      const thumbnail = fs.readFileSync(nailPath, 'Base64');
      documents.push({
        docId: doc._id,
        docName: doc.name,
        tagId: doc.tagId,
        mimetype: doc.mimetype,
        thumbnail
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
      return { mimetype: doc.mimetype, file: data };
    });
  }

  async getTags(user) {
    util.checkEmpty(user, i18next.t('nullUser'));
    const result = await Tag.find({ userId: user._id }).exec();
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

  async getSpaces(user, q) {
    util.checkEmpty(user, i18next.t('nullUser'));
    let query = null;
    if (q !== null) {
      query = Space.find({
        userId: user._id,
        spaceName: new RegExp(`.*${q}.*`)
      });
    } else {
      query = Space.find({ userId: user._id });
    }
    const result = await query.sort({ createDate: -1 }).exec();
    const retVal = [];
    result.forEach(e => {
      let filePath = null;
      if (e.fileName !== null && e.fileName !== '') {
        filePath = path.join(this.spaceFileRoot, e.fileName);
      } else {
        filePath = 'assets/default.png';
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
