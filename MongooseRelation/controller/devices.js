var mongoose = require('mongoose');
var Devices = mongoose.model('Devices');

module.exports.addDevice = function(req, res){
   var device = req.body;
   var model = new Devices({
       deviceName: device.deviceName,
       userId: device.userId
   });
   
   model.save(function(err, doc){
       if(err)
           throw err;
       res.status(200).send(doc);
   });
};