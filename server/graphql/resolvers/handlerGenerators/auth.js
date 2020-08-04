// User Model
import User from '../../../models/user';
// are used to hash password stored into database
import bcrypt from 'bcryptjs';
// are used to create secret/private key and verify token
import jwt from 'jsonwebtoken';
// create user
export async function createUser(args) {
    try {
        const {
            email,
            password,
            confirm
        } = args.userInput // retrive value from args

        // checking existin User
        const existingUser = await User.findOne({email});
        if(existingUser){
            throw new Error ('User already exist');
        }
        // password check
        if(password!=confirm) {
            throw new Error('Password not match');
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password,10);

        // create new user
        const user = new User({
            email,
            password: hashedPassword
        },(err => {
            if(err) {
               throw('Error creating new User',err)
            }
        })
        );
        user.save();

        // if user is registered without errors
        // create TOKEN
        const token = jwt.sign({id: user._id}, 'mysecret');
        return {
            token,
            password: null,
            ...user._doc
        }
        
    } catch (error) {
        throw error;
    }
}

// For Login Functionality
export async function login(args) {
    try {
        const user = await User.findOne({email : args.email});
        if(!user) {
            throw new Error('Email does not exist');
        }
        // checking the validity of password
        const isPasswordValid = await bcrypt.compareSync(args.password, user.password);
        if(!isPasswordValid) {
            throw new Error('Password is not valid');
        }
        // generating token if there is no errors
        const token = jwt.sign({id: user._id}, 'mysecret');
        return {
            token,
            password: null,
            ...user._doc
        }
        
    } catch (error) {
        throw error;
    }
}

// verify Token

export async function verifyToken(args) {
    try {
        const decode = jwt.verify(args.token, "mysecret");
        const user = await User.findOne({_id:decode.id});
        return {
            ...user._doc,
            password:null,
        }
    } catch (error) {
        throw error
    }
}
