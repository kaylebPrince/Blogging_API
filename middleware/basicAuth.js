const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

const AuthProcedure = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, secret, async (err, decodedToken)=>{
            if(err){
                res.redirect("/login");
            } else {
                const user = await User.findById(decodedToken.id);
                req.user = user;
                next();
            }
        });
    }else{
        res.redirect("/login");
    }
};

const currentUser = (req, res, next)=>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, secret, async(err, decodedToken)=>{
            if(err){
                req.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                req.user = user;
                next();
            }
        });
    } else {
        req.user = null;
        next();
    }
};

module.exports = {AuthProcedure, currentUser};
