const express = require('express');
const cors = require('cors');
const passport = require('passport');

const Authenticate = require('../model/authenticate');
const util = require('../helper/util');

const router = express.Router();
const auth = new Authenticate();

/**
 * @swagger
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

/**
 * @swagger
 * /auth/login/local:
 *   post:
 *     summary: Login as loca user account
 *     description: Login as loca user account
 *     parameters:
 *        - name: "user"
 *          in: "body"
 *          description: "ユーザー情報"
 *          required: true
 *          schema:
 *            type: object
 *            properties:
 *              localId:
 *                type: "string"
 *                example: admin
 *              password:
 *                type: "string"
 *                example: "admin"
 *     tags:
 *        - auth
 *     responses:
 *       200:
 *         description: Authenticate successfully
 */
router.post('/login/local', cors(), (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ info });
    }
    const token = auth.createToken(user);
    return res.status(200).json({ accessToken: `Bearer ${token}` });
  })(req, res, next);
});

router.post(
  '/login/facebook',
  cors(),
  passport.authenticate('facebook', { session: false }),
  (req, res, next) => {}
);

router.get(
  '/login/facebook/callback',
  cors(),
  passport.authenticate('facebook', { session: false }),
  (req, res, next) => {
    const token = auth.createToken(req.user);
    res.cookie('sr.auth.token', `Bearer ${token}`);
    return res.redirect(301, `${util.getWebAppURL()}/home`);
  }
);

router.post(
  '/login/github',
  cors(),
  passport.authenticate('github', { session: false }),
  (req, res, next) => {}
);

router.get(
  '/login/github/callback',
  cors(),
  passport.authenticate('github', { session: false }),
  (req, res, next) => {
    const token = auth.createToken(req.user);
    res.cookie('sr.auth.token', `Bearer ${token}`);
    return res.redirect(301, `${util.getWebAppURL()}/home`);
  }
);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current login user information
 *     description: Get current login user information
 *     tags:
 *        - auth
 *     security:
 *        - BearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticate successfully
 */
router.get('/me', cors(), passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const user = auth.getUser(req.user);
  return res.status(200).json(user);
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user information
 *     description: Logiout user information
 *     tags:
 *        - auth
 *     security:
 *        - BearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticate successfully
 */
router.post(
  '/logout',
  cors(),
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.clearCookie('sr.auth.token');
    return res.status(200).json({});
  }
);

module.exports = router;
