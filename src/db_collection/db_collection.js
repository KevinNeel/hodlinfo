const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hondlinfo', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(()=>{
    console.log('Connection is Successfull');
}).catch((error)=>{
    console.log(error);
})

const api_Schema = new mongoose.Schema({
    name:{
        type: String,
    },
    last:{
        type:String
    },
    buy:{
        type:String
    },
    sell:{
        type:String
    },
    volume:{
        type:String
    },
    base_unit:{
        type:String
    }

});

const hodlinfo = new mongoose.model('data', api_Schema);

module.exports = hodlinfo;