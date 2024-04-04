const mongoose = require('mongoose')

const connectDB = ()=>{
    // const db_url = `mongodb://127.0.0.1:27017/bookapp`
    const db_url = `mongodb+srv://shreepathiachary264:shree123@cluster0.tqfufzy.mongodb.net/mybookapp?retryWrites=true&w=majority&appName=Cluster0`
    mongoose.connect(db_url,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log(`MongoDB connected with server :${data.connection.host}`);
    })
}

module.exports = connectDB;