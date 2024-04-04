const app = require('./app')

const connectDatabase = require('./config/database');


connectDatabase();

const server =app.listen(4000,()=>{
    console.log(`server running on http://localhost:${4000}`);
})