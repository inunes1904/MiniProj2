const express = require('express');
const router = express.Router();
const SponsorController = require('../controllers/sponsor.controller');
const {
    body,
    param,
} = require('express-validator');
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, SponsorController.get)
    .post(AuthController.checkAuth, [
        body('name').isString(),
        body('animal').isString(),
        body('group').isString(),
        body('years_sponsored').isInt(),
        body('description').isString(),
        body('img').isString(),
        body('value').isFloat(),
        body('contact').isString(),
        body('location.city').isString(),
        body('location.country').isString(),
    ], SponsorController.create);

router.route("/deactivate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], SponsorController.deactivate);

router.route("/activate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], SponsorController.activate);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], SponsorController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], SponsorController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], SponsorController.delete);

module.exports = router;