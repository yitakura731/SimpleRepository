const express = require('express');
const cors = require('cors');
const multer = require('multer');
const config = require('config');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const Repository = require('./../model/repository');

const contentsStorage = config.get('contentsStorage');
const spaceStorage = config.get('spaceStorage');

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
 * /documents:
 *   post:
 *     summary: Regist document
 *     tags:
 *        - document
 *     description: Regist document to repository
 *     responses:
 *       200:
 *         description: Regist document successfully
 */
router.post('/documents', cors(), upload.single('docFile'), (req, res, next) => {
  repository
    .postDocumet(req.body.spaceId, req.body.tagId, req.body.docName, req.file)
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
 * /spaces:
 *   post:
 *     summary: Regist space
 *     tags:
 *        - space
 *     description: Regist space to repository
 *     responses:
 *       200:
 *         description: Regist space successfully
 */
router.post('/spaces', cors(), upload.single('spaceImage'), (req, res, next) => {
  repository
    .postSpace(req.body.name, req.file)
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
 * /tags:
 *   post:
 *     summary: Regist tag
 *     tags:
 *        - tag
 *     description: Regist tag to repository
 *     responses:
 *       200:
 *         description: Regist tag successfully
 */
router.post('/tags', cors(), (req, res, next) => {
  repository
    .postTag(req.body.name, req.body.color)
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
 * /documents:
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
router.get('/documents', cors(), (req, res, next) => {
  const { spaceId } = req.query;
  repository
    .getDocuments(spaceId)
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
 * /documents/{id}/contents:
 *   get:
 *     summary: Get content of the document
 *     tags:
 *        - document
 *     description: Get a content of the specified document by id from repository
 *     responses:
 *       200:
 *         description: Get content successfully
 */
router.get('/documents/:id/contents', cors(), (req, res, next) => {
  repository
    .getContent(req.params.id)
    .then(content => {
      res
        .status(200)
        .contentType('application/pdf')
        .send(content);
    })
    .catch(err => next(err));
});

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Get tag list
 *     tags:
 *        - tag
 *     description: Get tag list from repository
 *     responses:
 *       200:
 *         description: Get tag successfully
 */
router.get('/tags', cors(), (req, res, next) => {
  repository
    .getTags()
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
 * /spaces:
 *   get:
 *     summary: Get space list
 *     description: Get space list from repository
 *     tags:
 *        - space
 *     responses:
 *       200:
 *         description: Get tag successfully
 */
router.get('/spaces', cors(), (req, res, next) => {
  let q = null;
  if (req.query.q != null) {
    q = decodeURIComponent(req.query.q);
  }
  repository
    .getSpaces(q)
    .then(spaces => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .json(spaces);
    })
    .catch(err => next(err));
});

module.exports = router;
