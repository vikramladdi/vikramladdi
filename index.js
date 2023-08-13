const connectDB = require('./db');
const express = require('express')
const app = express()
const port = 5000
connectDB();


//API end points
app.use(express.json()) 
const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');
app.use('/api/auth',authRouter);
app.use('/api/notes',notesRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
 