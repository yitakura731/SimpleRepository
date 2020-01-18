const i18next = require('i18next');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: '/rep.env' });
const util = require('../helper/util');

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'simple_repository'
    },
    (jwtPayload, cb) => {
      return cb(null, {
        userId: jwtPayload.userId
      });
    }
  )
);
