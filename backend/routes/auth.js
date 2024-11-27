import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { body, validationResult } from'express-validator';
import { User } from '../modal/userSchema.js'
import dotenv from 'dotenv';
const router = express.Router()
const saltRounds = 10
dotenv.config();
const secKey = process.env.secKey

// register User
router.post('/register',[
    body('name', "Enter a valid Name").trim().isLength({min:3}),
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password must be 5 characters").trim().isLength({min:5}),
    body('dob', 'Enter a valid DOB').trim().isDate()
], async(req, res)=>{
    const error = validationResult(req)
    let sucessResult = false

    // check validation
    if (!error.isEmpty()) {
        return res.status(400).json({sucessResult, errors: error.array()[0].msg });
    }

    try{
        // find user
        const existUser = await User.findOne({email:req.body.email})
        if(existUser){
            return res.status(302).json({sucessResult, errors:"email already exist" });
        }
        // add user
        const hasPassword =  await bcrypt.hash(req.body.password, saltRounds)
        const addUser = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:hasPassword,
            dob:req.body.dob 
        })
        sucessResult = true

        // token data (User id)
        const data = {
            id:addUser.id
        }
        // sign token
        const token = jwt.sign(data , secKey);
        return res.json({sucessResult, token});

    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({sucessResult, errors: "Email already exists", message: error.message });
        }
        return res.status(500).json({sucessResult, errors: "An error occurred while creating the user", message: error.message });
    }
})


// login user
router.post('/login', [
    body('email', "Email is required").isEmail(),
    body('password', "Password is required").exists()
], async(req, res)=>{
    const error = validationResult(req)
    let sucessResult = false

    // check vaidation
    if(!error.isEmpty()){
        return res.status(400).json({sucessResult, errors: error.array()[0].msg });
    }

    try{
        // find user
        const findUser = await User.findOne({email:req.body.email})
        if(!findUser){
            return res.status(400).json({error:"email not exist"});
        }

        // compare password
        const comparePass = await bcrypt.compare(req.body.password, findUser.password)
        if(!comparePass){
            return res.status(400).json({error:"Incorrect Password"});
        }

        // token data (User id)
        const data = {
            id:findUser.id
        }
        const authToken = jwt.sign(data, secKey) 
        sucessResult = true
        return res.send({sucessResult, authToken, findUser})
    }
    catch(error){
        return res.status(500).json({error:error.message});
    }
})

export {router}