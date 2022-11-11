const express = require('express');
const blogRouter = require('./routes/blogRoutes');
const authRouter = require('./routes/authRoutes');
const connectToMongoDB = require('./Database/Index');
const cookieParser = require("cookie-parser");
const {AuthProcedure, currentUser} = require("./middleware/basicAuth");
require('dotenv').config();


PORT = process.env.PORT;

// Connect to Database
connectToMongoDB();

const app = express();


// Middleware
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.get("*", currentUser);
app.get("/", (req, res)=>{
    res.json({
        message: "Welcome to our blogging app!"
    });
});

// Routes
app.use('/blog/user', authRouter);
app.use('/blog', blogRouter)



// 404 route
app.get('*', (req,res)=>{
    return res.status(404).send('opps! we can\'t seem to locate the resource you\'re looking for')
});

// Catch Server errors
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Server error!";
    res.status(statusCode).json({ error: "Something went wrong", err });
  });

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});