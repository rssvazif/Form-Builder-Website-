const mongoose = require('mongoose')
const {User,InformationUser,Label,Form} = require('./schema')


const connectDB = async ()=>{
    try{
        await mongoose.connect('mongodb://jotForm_mongo:27017/JotFormDB')
        console.log('connect to dbs is done.');
    }catch(error){
        console.log(error.message);
        process.exit(1)
    }
}


mongoose.connection.once('open', async () => {
    try{
        await User.ensureIndexes();
        await InformationUser.ensureIndexes();
        await Label.ensureIndexes();
        await Form.ensureIndexes();
    }catch(error){
        console.log(error);
    }
});

module.exports = connectDB;