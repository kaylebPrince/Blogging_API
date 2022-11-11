const jwt = require('jsonwebtoken');
const UserModel = require('../Models/UserModel');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const errorHandler = (err)=>{
    let errors = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    };

    if(err.message === "Incorrect email"){
        errors.email = "Email not found, please enter a valid email";
    }

    if(err.message === "Incorrect password"){
        errors.password = "incorrect password, please enter a valid password";
    }

    if(err.code === 11000){
        if(err.message.includes("index: email_1")){
            errors.email = "This mail already exists";
            return errors;
        }
    }

    // Validation Errors
    if(err.message.includes("User validation failed")){
        Object.values(err.errors).forEach(({props})=>{
            errors[props.path] = props.message;
        });
    }

    return errors;
};

// Token creation
const maxAge = 1 * 60 * 60;
const createToken = (id)=>{
    return jwt.sign({id}, secret,{
        expiresIn: maxAge,
    });
}

exports.signupPage = async(req,res)=>{
    res.send("signup");
};

exports.loginPage = async(req,res)=>{
    res.send("login");
}

exports.signup = async(req,res) =>{
    const { firstName, lastName, email, password } = req.body;
    // const user = await UserModel.findOne({user: req.user});

    try{
        const user = await UserModel.create({
            firstName,
            lastName,
            email,
            password
        });
        console.log(user);
        const token = await createToken(user._id);
        console.log(token);
        console.log(user._id);
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({status: true, data: user});
    } catch (err){
        const errors = errorHandler(err);
        res.status(400).json({status: false, error: errors});
    }
};

exports.login = async (req,res)=>{
    const {email, password} = req.body;

    try{
        const user = await UserModel.login(email, password);
        const token = await createToken(user._id);
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge*1000});
        res.status(200).json({status:true, data:user});
    }catch (err){
        const errors = errorHandler(err);
        res.status(400).json({status:false, error: errors});
    }
};

exports.log_out = (req, res)=>{
    res.cookies("jwt", "", {maxAge:1});
    res.status(200).json({message: "You signed out"});
}