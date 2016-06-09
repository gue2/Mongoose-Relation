var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.createUser = function (req, res) {
    var user = req.body;
    var model = new User({
        name: user.name
    });

    model.save(function (err, doc) {
        if (err)
            throw err;
        res.status(200).send(doc);
    });
};

module.exports.listUsers = function (req, res) {
    User.find()
            .populate('devices')
            .exec(function (err, docs) {
                if (err)
                    throw err;
                res.status(200).send(docs);
            });
};

module.exports.addDevice = function (req, res) {
    var user = req.body;
    User.find({"_id": user.userId}, function (err, usr) {
        usr[0].devices.push(user.deviceId);
        usr[0].save(function (err, doc) {
            if (err)
                throw err;
            res.status(200).send(doc);
        });
    });
};