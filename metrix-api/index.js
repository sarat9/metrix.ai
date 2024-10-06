const express = require('express');
const db = require('./src/config/postgres_db');
const app = express();
const scheduloo = require('./src/schedulers/metrixScheduler'); 

const dotenv = require('dotenv');
dotenv.config()
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

const cors = require('cors')
app.use(cors({
    origin: "http://127.0.0.1:3000",
    credentials: true, 
}))



const route = require('./src/routes')
app.use('/api', route)



const PORT = process.env.PORT || 5000;

async function dd(){
    const result = await db.query('SELECT NOW()');
    console.log(result.rows[0]);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  dd();
});
