require('dotenv').config({ path: './rep.env' });
const i18next = require('i18next');

const MAX_FILE_SIZE = process.env.MAX_FILE_SIZE || 512;

module.exports = class Util {
  static checkEmpty(target, message) {
    if (target == null || target === '') {
      throw new TypeError(message);
    }
  }

  static checkNull(target, message) {
    if (target == null) {
      throw new TypeError(message);
    }
  }

  static getRedirectWebAppURL() {
    return `${process.env.WEB_SERVER_REDIRECT_URL}`;
  }

  static checkFileSize(size) {
    if (size >= MAX_FILE_SIZE * 1024) {
      throw new Error(i18next.t('exceedLimitUploadFileSize'));
    }
  }

  static checkSupportedFormat(format) {
    if (!(format === 'image/jpeg' || format === 'application/pdf')) {
      throw new Error(i18next.t('unsupportedFileFormat'));
    }
  }

  static getExtent(format) {
    let retVal = null;
    if (format === 'image/jpeg') {
      retVal = 'jpg';
    } else if (format === 'application/pdf') {
      retVal = 'pdf';
    }
    return retVal;
  }
};
