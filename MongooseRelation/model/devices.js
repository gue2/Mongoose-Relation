module.exports = function(mongoose){
    var device = new mongoose.Schema({
        deviceName: { type  :   String },
        userId:     { type  :   String }
    });
    
    mongoose.model('Devices', device);
};