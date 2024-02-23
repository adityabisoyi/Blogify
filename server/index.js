const express = require('express');
const connectDB = require('./connection');
const cors = require('cors')
require('dotenv').config()

const PostRouter = require('./routes/post.routes')
const UserRouter = require('./routes/user.routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use(cors({credentials: true, origin: "http://localhost:3000"}))
connectDB(process.env.MONGO_URI)


app.use('/api/user', UserRouter)
app.use('/api/post', PostRouter)


app.use(notFound)
app.use(errorHandler)


app.listen(process.env.PORT || 5000, () => {
    console.log("Server started on Port: ", process.env.PORT)
})