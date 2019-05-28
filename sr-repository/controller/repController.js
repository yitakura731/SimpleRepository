const express = require('express');
const cors = require('cors');
const multer = require('multer');
const config = require('config');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const Repository = require('../model/repository');

const contentsStorage = config.get('contentsStorage');
const spaceStorage = config.get('spaceStorage');

const passport = require('passport');

const repository = new Repository(contentsStorage, spaceStorage);

/**
 * @swagger
 * tags:
 *  - name:document
 *    description:REST api for document operation
 *  - name:space
 *    description:REST api for space operation
 *  - name:tag
 *    description:REST api for tag operation
 */

/**
 * @swagger
 * /rep/documents:
 *   post:
 *     summary: Regist document
 *     tags:
 *        - document
 *     description: Regist document to repository
 *     responses:
 *       200:
 *         description: Regist document successfully
 */
router.post('/documents', cors(),
  passport.authenticate('jwt', { session: false }),
  upload.single('docFile'),
  (req, res, next) => {
  repository
    .postDocumet(
      req.user, req.body.spaceId, req.body.tagId,
      req.body.docName, req.file)
    .then(document => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .json({ name: document.name });
    })
    .catch(err => next(err));
});

/**
 * @swagger
 * /rep/spaces:
 *   post:
 *     summary: Regist space
 *     tags:
 *        - space
 *     description: Regist space to repository
 *     responses:
 *       200:
 *         description: Regist space successfully
 */
router.post('/spaces', cors(),
  passport.authenticate('jwt', { session: false }),
  upload.single('spaceImage'),
  (req, res, next) => {
  repository
    .postSpace(req.user, req.body.name, req.file)
    .then(space => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .json({ name: space.spaceName });
    })
    .catch(err => next(err));
});

/**
 * @swagger
 * /rep/tags:
 *   post:
 *     summary: Regist tag
 *     tags:
 *        - tag
 *     description: Regist tag to repository
 *     responses:
 *       200:
 *         description: Regist tag successfully
 */
router.post('/tags', cors(),
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
  repository
    .postTag(req.user, req.body.name, req.body.color)
    .then(tag => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .json({ name: tag.name });
    })
    .catch(err => next(err));
});

/**
 * @swagger
 * /rep/documents:
 *   get:
 *     summary: Get document list
 *     tags:
 *       - document
 *     description: Get document list from repository
 *     parameters:
 *        - name: spaceId
 *          in: query
 *          description: Id of the fetch target space
 *          required: false
 *          type: string
 *     responses:
 *       200:
 *         description: Get document list successfully
 */
router.get('/documents', cors(),
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
  const { spaceId } = req.query;
  repository
    .getDocuments(req.user, spaceId)
    .then(docs => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .json(docs);
    })
    .catch(err => next(err));
});

/**
 * @swagger
 * /rep/documents/{id}/contents:
 *   get:
 *     summary: Get content of the document
 *     tags:
 *        - document
 *     description: Get a content of the specified document by id from repository
 *     responses:
 *       200:
 *         description: Get content successfully
 */
router.get('/documents/:id/contents', cors(),
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
  repository
    .getContent(req.params.id)
    .then(content => {
      if (content.mimetype == 'application/pdf') {
        res
          .status(200)
          .contentType('application/pdf')
          .send(content.file);
      } else if (content.mimetype == 'image/jpeg') {
        const base64Image =
          new Buffer(content.file, 'binary').toString('base64');
        res
          .status(200)
          .contentType('image/jpeg')
          .send(base64Image);
      }
    })
    .catch(err => next(err));
});

/**
 * @swagger
 * /rep/tags:
 *   get:
 *     summary: Get tag list
 *     tags:
 *        - tag
 *     description: Get tag list from repository
 *     responses:
 *       200:
 *         description: Get tag successfully
 */
router.get('/tags', cors(),
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
  repository
    .getTags(req.user)
    .then(tags => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .json(tags);
    })
    .catch(err => next(err));
});

/**
 * @swagger
 * /rep/spaces:
 *   get:
 *     summary: Get space list
 *     description: Get space list from repository
 *     tags:
 *        - space
 *     responses:
 *       200:
 *         description: Get tag successfully
 */
router.get('/spaces', cors(),
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
  let q = null;
  if (req.query.q != null) {
    q = decodeURIComponent(req.query.q);
  }
  repository
    .getSpaces(req.user, q)
    .then(spaces => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .json(spaces);
    })
    .catch(err => next(err));
});

module.exports = router;
