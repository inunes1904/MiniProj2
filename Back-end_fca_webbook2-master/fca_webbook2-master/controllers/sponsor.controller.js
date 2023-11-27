const Sponsor = require('../models/sponsor.model');
const {
    validationResult
} = require('express-validator');
const AnimalMessages = require("../messages/animal.messages");

//TODO Messages

exports.get = (req, res) => {
    Sponsor.find(req.query, (error, sponsors) => {
        if (error) throw error;
        let message = AnimalMessages.success.s2;
        if (sponsors.length <= 0)
            message = AnimalMessages.success.s5;
        message.body = sponsors;
        return res.status(message.http).send(message);
    });
};


exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Sponsor({
        name: req.body.name,
        constact: req.body.contact,
        animal: req.body.animal,
        value: req.body.value,

    }).save((error, sponsor) => {
        if (error) throw error;
        let message = AnimalMessages.success.s0;
        message.body = sponsor;
        return res.header("location", "/sponsors/" + sponsor._id).status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Sponsor.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, sponsor) => {
        if (error) throw error;
        if (!sponsor) return res.status(AnimalMessages.error.e0.http).send(AnimalMessages.error.e0);

        let message = AnimalMessages.success.s1;
        message.body = sponsor;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Sponsor.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(AnimalMessages.error.e0.http).send(AnimalMessages.error.e0);
        return res.status(AnimalMessages.success.s3.http).send(AnimalMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Sponsor.findOne({
        _id: req.params.id
    }).exec((error, sponsor) => {
        if (error) throw error;
        if (!sponsor) return res.status(AnimalMessages.error.e0.http).send(AnimalMessages.error.e0);
        let message = AnimalMessages.success.s2;
        message.body = sponsor;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Sponsor.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(AnimalMessages.error.e0.http).send(AnimalMessages.error.e0);
        return res.status(AnimalMessages.success.s6.http).send(AnimalMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Sponsor.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(AnimalMessages.error.e0.http).send(AnimalMessages.error.e0);
        return res.status(AnimalMessages.success.s4.http).send(AnimalMessages.success.s4);

    });
}