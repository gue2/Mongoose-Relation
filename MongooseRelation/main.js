var express = require("express"),
        app = express(),
        bodyParser = require("body-parser"),
        methodOverride = require("method-override"),
        mongoose = require('mongoose');

var host = 'localhost';
// Connection to DB
mongoose.connect('mongodb://' + host + '/contactsDb', function (err, res) {
    if (err)
        throw err;
    console.log('Connected to Database Contacts DB');
});

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Credentials', true);
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", 'Content-Type, Authorization, Content-Length, X-Requested-With');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

var UserModel = require('./model/user')(mongoose);
var UserCtrl = require('./controller/user');

var DeviceModel = require('./model/devices')(mongoose);
var DeviceCtrl = require('./controller/devices');

var user = express.Router();
var devices = express.Router();

user.route('/createUser')
        .post(UserCtrl.createUser);

user.route('/listUsers')
        .post(UserCtrl.listUsers);

user.route('/addDevice')
        .post(UserCtrl.addDevice);

devices.route('/addDevice')
        .post(DeviceCtrl.addDevice);

app.use('/api/user', user);
app.use('/api/devices', devices);

// Start server
app.listen(3000, function () {
    console.log("Node server running on http://localhost:3000");
});
