const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimerSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    focus: { type: Number, default: 25 },
    shortbreak: { type: Number, default: 5 },
    longbreak: { type: Number, default: 10 }
});

const TimerModel = mongoose.model('Timer', TimerSchema);
module.exports = TimerModel;
