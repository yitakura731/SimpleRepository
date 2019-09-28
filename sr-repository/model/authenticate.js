const mongoose = require('mongoose');
const i18next = require('i18next');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: '../.env' });
const util = require('../helper/util');

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const User = mongoose.model('users');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'localId',
      passwordField: 'password'
    },
    (localId, password, cb) => {
      return User.findOne({ localId })
        .then((user, err) => {
          if (err) {
            return cb(err);
          }
          if (user == null) {
            return cb(null, false, { message: i18next.t('incorrectUser') });
          }
          if (user.password !== password) {
            return cb(null, false, { message: i18next.t('incorrectUser') });
          }
          return cb(null, user);
        })
        .catch(err => cb(err));
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECREAT,
      callbackURL: `${util.getRepositoryURL()}${process.env.FACEBOOK_CALLBACK_URL}`
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({ facebookId: profile.id }, (err, user) => {
        if (user != null) {
          return cb(null, user);
        }
        const facebookUser = new User({
          _id: new mongoose.Types.ObjectId(),
          strategy: 'facebook',
          facebookId: profile.id,
          username: profile.displayName
        });
        facebookUser
          .save()
          .then(() => {
            return cb(null, facebookUser);
          })
          .catch(e => {
            return cb(e);
          });
      });
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECREAT,
      callbackURL: `${util.getRepositoryURL()}${process.env.GITHUB_CALLBACK_URL}`
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({ githubId: profile.id }, (err, user) => {
        if (user != null) {
          return cb(null, user);
        }
        const githubUser = new User({
          _id: new mongoose.Types.ObjectId(),
          strategy: 'github',
          githubId: profile.id,
          username: profile.displayName
        });
        githubUser
          .save()
          .then(() => {
            return cb(null, githubUser);
          })
          .catch(e => {
            return cb(e);
          });
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'simple_repository'
    },
    (jwtPayload, cb) => {
      return User.findById(jwtPayload.id)
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    }
  )
);

module.exports = class Authenticate {
  createToken(user) {
    return jwt.sign(
      {
        id: user.id
      },
      'simple_repository',
      { expiresIn: '300m' }
    );
  }

  getUser(user) {
    return {
      id: user.id,
      name: user.username,
      strategy: user.strategy
    };
  }
};
