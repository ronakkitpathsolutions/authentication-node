import express from 'express'
import db from './src/db/db.js';

const PORT = 4000 || process.env.PORT
const App = express();

db.then(() => {
    console.log('started')
}).catch((error) => console.log(error))

// default json format middleware
App.use(express.json())

App.listen(PORT, () => {
    console.log('start started')
})