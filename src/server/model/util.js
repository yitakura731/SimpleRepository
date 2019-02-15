module.exports = class Util {

    constructor(){}

    static checkEmpty(target, message) {
        if(target == null || target == '') {
            throw new TypeError(message);
        }
    }

    static checkNull(target, message) {
        if(target == null) {
            throw new TypeError(message);
        }
    }
}