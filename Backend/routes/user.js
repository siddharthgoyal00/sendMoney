import express from "express";
import {z} from "zod";
import {User} from "../db";
import {JWT_SECRET} from "jsonwebtoken";
import {authMiddleware} from "../middleware";
const router =  express.Router();  // define routes for handeling req


const signUpSchema = z.object({    // validation schema for signup
    username:  z.string().email(),
    password:  z.string(),
    firstName: z.string(),
    lastName:  z.string()
})


router.post("/signup", async (req,res)=>{   // this route handel user registration 
 
  const parsed = signUpSchema.safeParse(req.body);   // safeparse is by zod liberary gives success : true,false   , data , error
  if (!parsed.success){
    return res.json({
        msg: "wrong inputs / Email already taken"
    })
  }

   
  const existingUser  =await User.findOne({
       username :  req.body.username 
 })

 if(existingUser){
    return res.json({
        msg: "wrong inputs / Email already taken"
    })
 }

 const user = await User.create ({  // cerate the new user in the  database with the given info 
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
 })
 const userId = user._id; // retrieve the user id given by the mongodb _id to each user 
 const token = jwt.sign({userId }, JWT_SECRET) // creates the jwt token using their id and the secret key
res.json({
  msg: "user created successfully",
  token: token 
})
 
});

const signInSchema = z.object({  //  validation schema for the singin 
  username: z.string().email(),
  password: z.string()
})

router.post("/signin", async(req,res)=>{  // this route will handel the user login 
  const parsed = signInSchema.safeParse(req.body);
  if(!parsed.success){
      return res.json({
        msg:"input incorrect"
      })
  }
  const user = await User.findOne({   // finds the exixting user with the given credentials 
        username: req.body.username,
        password: req.body.password
  });
  if (user) {
    const token = jwt.sign({
        userId: user._id // this is the pAY LOAD
    }, JWT_SECRET); // A SECRET KEY USED FOR digitally sign the token

    res.json({
        token: token // this will be store in the local storage , session storage or the secure cookie 
    })
    return;
}


res.status(411).json({
    message: "Error while logging in"
})

  
});
const updateBody = z.object({
	password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const parseed = updateBody.safeParse(req.body)
    if (!parseed.success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;


