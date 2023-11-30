const Sponsor = require('../models/sponsor.model');
const { validationResult } = require('express-validator');
const SponsorMessages = require("../messages/sponsor.messages");
require("jsonwebtoken");
require("../config/config");
exports.get = (req, res) => {
    Sponsor.find(req.query, (error, sponsors) => {
        if (error) throw error;

        let message = SponsorMessages.success.s2;

        if (sponsors.length <= 0)
            message = SponsorMessages.success.s5;

        message.body = sponsors;
        return res.status(message.http).send(message);
    });
};

exports.getOne = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Sponsor.findOne({
        _id: req.params.id
    }, (error, sponsor) => {
        if (error) throw error;
        if (!sponsor) return res.status(SponsorMessages.error.e1.http).send(SponsorMessages.error.e1);

        let message = SponsorMessages.success.s2;
        message.body = sponsor;
        return res.status(message.http).send(message);
    });
};

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Sponsor.findOne({
        "name": req.body.name
    }, (error, sponsor) => {
        if (error) throw error;
        if (sponsor) return res.status(SponsorMessages.error.e0.http).send(SponsorMessages.error.e0);

        new Sponsor({

            name: req.body.name,
            animal: req.body.animal,
            group: req.body.group,
            years_sponsored: req.body.years_sponsored,
            description: req.body.description,
            img:req.body.img,
            value:req.body.value,
            contact:req.body.contact,
            location: {
                city: req.body.location.city,
                country: req.body.location.country
            }
        }).save((error, sponsor) => {
            if (error) throw error;

            let message = SponsorMessages.success.s0;
            message.body = sponsor;
            return res.header("location", "/sponsors/" + sponsor._id).status(message.http).send(message);
        });
    });
};

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
        if (!sponsor) return res.status(SponsorMessages.error.e1.http).send(SponsorMessages.error.e1);

        let message = SponsorMessages.success.s1;
        message.body = sponsor;
        return res.status(message.http).send(message);
    });
};

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Sponsor.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(SponsorMessages.error.e1.http).send(SponsorMessages.error.e1);

        // Remova a lógica de atualização de outros documentos, se não for necessário

        return res.status(SponsorMessages.success.s3.http).send(SponsorMessages.success.s3);
    });
};

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

        if (result.n <= 0) return res.status(SponsorMessages.error.e0.http).send(SponsorMessages.error.e0);
        return res.status(SponsorMessages.success.s6.http).send(SponsorMessages.success.s6);
    });
};

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

        if (result.n <= 0) return res.status(SponsorMessages.error.e0.http).send(SponsorMessages.error.e0);
        return res.status(SponsorMessages.success.s4.http).send(SponsorMessages.success.s4);
    });
};