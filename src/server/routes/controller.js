const express = require('express');
const cors = require('cors');
const multer = require('multer');
const config = require('config');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const Repository = require('./../model/repository');

const contentsStorage = config.get('contentsStorage');

const repository = new Repository(contentsStorage, 'public\\spaces');

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

router.get('/documents/:id', cors(), (req, res, next) => {
  repository
    .getDocuments(req.params.id)
    .then(docs => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .json(docs);
    })
    .catch(err => next(err));
});

router.get('/contents/:id', cors(), (req, res, next) => {
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

router.get('/tags', cors(), (req, res, next) => {
  repository
    .getTags(req.params.id)
    .then(tags => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .json(tags);
    })
    .catch(err => next(err));
});

router.get('/spaces/:name', cors(), (req, res, next) => {
  const name = decodeURIComponent(req.params.name);
  repository
    .getSpaces(name)
    .then(spaces => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .json(spaces);
    })
    .catch(err => next(err));
});

router.get('/spaces', cors(), (req, res, next) => {
  repository
    .getAllSpaces()
    .then(spaces => {
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .json(spaces);
    })
    .catch(err => next(err));
});

module.exports = router;
