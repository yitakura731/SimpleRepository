require('dotenv').config({ path: '../.env' });

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

  static getWebAppURL() {
    return `${process.env.WEB_SERVER_HTTP_PROTOCOL}://${process.env.WEB_SERVER_HOST}:${process.env.WEB_SERVER_PORT}/${process.env.APP_NAME}`;
  }

  static getRepositoryURL() {
    return `${process.env.REPOSITORY_HTTP_PROTOCOL}://${process.env.REPOSITORY_HOST}:${process.env.REPOSITORY_PORT}/${process.env.APP_NAME}`;
  }
};
