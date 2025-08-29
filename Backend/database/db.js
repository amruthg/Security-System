const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const DBConnection = async ()=>{
    const MONGO_URL = process.env.MONGO_URL;
    try{
        await mongoose.connect(MONGO_URL,{
            ssl:true
        })
        console.log("DB connection established");
    }
    catch(err){
        console.log(err);
    }
}

module.exports={DBConnection};