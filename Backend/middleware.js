import { JWT_SECRET } from "./config.js";
import jwt from "jsonwebtoken";
const {verify} = jwt;
export const authMiddleware = (req, res, next) => {     // anytime req comes 
    const authHeader = req.headers.authorization;    // get the  authHeader

    if (!authHeader || !authHeader.startsWith('Bearer ')) {  // make sure that it starts with the Bearer 
        return res.status(403).json({});  //or it could be API key 
    }
 
// bearer and the API key are the type of the token 

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
};



/*
there is database and the express server and the user. now the user giving his name: abcd 
and password : 1234 now we have  two choices first we store the name and the password in the 
database as the Name : abcd   password : 1234 ; othe choice is we hash the password 
into the some jibrish {user--> pass: 1234  -> express converts
 pass: fvggvevh36bf98g  -> this get stored in the database } 
 one more 
 we can add salt to it :-
 user-> pass: 1234 we associate it with some string 1234 sid now 1234 and the sid they both will be hashed 
 and then they will be stored in the database
*/