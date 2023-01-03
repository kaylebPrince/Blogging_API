const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        validate: [isEmail, "Please enter a valid email address"]
    },

    firstName:{
        type: String,
        required: [true, "First name is required"]
    },

    lastName:{
        type: String,
        required: [true, "Last Name is required"]
    },

    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },

    password:{
        type: String,
        required: [true, "Please enter a password"]
    }
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    // console.log(`${this.password}, salt`)

    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function (email, password){
    const user = await this.findOne({email});
    console.log(user);

    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error("Incorrect password");
    }
    throw Error("Incorrect email");
};

const UserModel = mongoose.model('UserModel', userSchema);

module.exports = UserModel;