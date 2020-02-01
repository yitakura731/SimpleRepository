const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const Puid = require('puid');
const i18next = require('i18next');
const Jimp = require('jimp');
const log4js = require('log4js');
const database = require('./database');
const util = require('../helper/util');

const Space = mongoose.model('spaces');
const Document = mongoose.model('documents');
const Tag = mongoose.model('tags');

const logger = log4js.getLogger();
logger.level = process.env.LOGLEVEL || 'error';

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

    this.puid = new Puid(false);
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
    logger.debug('end check request argument');

    const ext = util.getExtent(file.mimetype);
    const filename = `${this.puid.generate()}.${ext}`;
    await fse.writeFile(path.join(this.docFileRoot, filename), file.buffer);
    logger.debug('end store primary');

    return this.createThumbnail(file.mimetype, filename)
      .then(thumbnailName => {
        const document = new Document({
          _id: new mongoose.Types.ObjectId(),
          name,
          userId: user.userId,
          tagId,
          createDate: new Date(),
          spaceId,
          filename,
          thumbnailName,
          mimetype: file.mimetype
        });
        return document.save();
      })
      .catch(err => {
        logger.debug(`error: '${err}'`);
        return Promise.reject(err);
      });
  }

  async createThumbnail(mimetype, primaryFileName) {
    if (mimetype === 'image/jpeg') {
      const thumbnailFileName = `${this.puid.generate()}.jpg`;
      return Jimp.read(path.join(this.docFileRoot, primaryFileName))
        .then(thumbnail => {
          logger.debug(`end load primary '${primaryFileName}' for thumbnail`);
          return thumbnail
            .resize(100, 100)
            .writeAsync(path.join(this.docFileRoot, thumbnailFileName));
        })
        .then(resp => {
          logger.debug(`end create thumbnail '${thumbnailFileName}'`);
          return Promise.resolve(thumbnailFileName);
        })
        .catch(err => {
          logger.debug(`error create thumbnail '${err}'`);
          return Promise.reject(err);
        });
    }
    return Promise.resolve('pdfNail.png');
  }

  async postSpace(user, name, file) {
    util.checkEmpty(user, i18next.t('nullUser'));
    util.checkEmpty(name, i18next.t('nullName'));
    if (file != null) {
      const storeFileName = `${this.puid.generate()}.png`;
      return fse.writeFile(path.join(this.spaceFileRoot, storeFileName), file.buffer).then(() => {
        const space = new Space({
          _id: new mongoose.Types.ObjectId(),
          userId: user.userId,
          spaceName: name,
          createDate: new Date(),
          fileName: storeFileName
        });
        return space.save();
      });
    }
    const space = new Space({
      _id: new mongoose.Types.ObjectId(),
      userId: user.userId,
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
      userId: user.userId,
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
        query = Document.find({ spaceId, userId: user.userId, name: new RegExp(`.*${q}.*`) });
      } else {
        query = Document.find({ spaceId, userId: user.userId });
      }
    } else if (q != null) {
      query = Document.find({ userId: user.userId, name: new RegExp(`.*${q}.*`) });
    } else {
      query = Document.find({ userId: user.userId });
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
    const result = await Tag.find({ userId: user.userId }).exec();
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
        userId: user.userId,
        spaceName: new RegExp(`.*${q}.*`)
      });
    } else {
      query = Space.find({ userId: user.userId });
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
