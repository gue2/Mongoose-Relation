module.exports = function(mongoose){
    var user = new mongoose.Schema({
        name:       { type  : String },
        devices:    [ { type  : mongoose.Schema.ObjectId, ref: 'Devices' } ]
    });
    mongoose.model('User', user);
};