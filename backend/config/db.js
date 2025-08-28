const mongoose = require('mongoose');

const CONNECTDB =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URl,{})
        console.log("connected to database")
    } catch (error) {
        console.log("error connecting to database",error)
        process.exit(1)
    }
}


module.exports = CONNECTDB;


// gjsgwm0bYGvoZDnf
// inBN6snONujANVXE

// // mongodb+srv://abhinavhazarika27:<db_password>@interviewprepai.ixejppb.mongodb.net/?retryWrites=true&w=majority&appName=InterviewPrepAi