require('dotenv').config({ path: './rep.env' });

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
    return `${process.env.WEB_SERVER_REDIRECT_URL}`;
  }
};
