const mongoose = require('mongoose');
const { json } = require('body-parser');


const TaskSchema = mongoose.Schema({
    
    id:{
        type: Date,
        default: Date.now
    },
    task:{
        type: String,
        required: false
    },
    state:{
        type: Boolean,
        required: false
    },
    geo:{
        type: Object,
        required: false
    } 

});

module.exports = mongoose.model('Tasks', TaskSchema);