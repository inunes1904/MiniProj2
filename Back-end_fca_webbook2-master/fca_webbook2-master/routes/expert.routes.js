const express = require('express');
const router = express.Router();
const ExpertController = require('../controllers/expert.controller');
const {
    body,
    param,
} = require('express-validator');
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, ExpertController.get)
    .post(AuthController.checkAuth, [
        body('name').isString(),
        body('animal').isString(),
        body('group').isString(),
        body('years_experted').isInt(),
        body('description').isString(),
        body('img').isString(),
        body('value').isFloat(),
        body('contact').isString(),
        body('location.city').isString(),
        body('location.country').isString(),
    ], ExpertController.create);

router.route("/deactivate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], ExpertController.deactivate);

router.route("/activate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], ExpertController.activate);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], ExpertController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], ExpertController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], ExpertController.delete);

module.exports = router;