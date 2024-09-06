import {express} from "express";
import {zod} from "zod";
import {User} from "../db";
import {JWT_SECRET} from "jsonwebtoken";
const router =  express.Router();

//======================== zod schema for the incomming user =========================
const signUpSchema = zod.object({
    username:  zod.string().email(),
    password:  zod.string(),
    firstName: zod.string(),
    lastName:  zod.string()
})

// make sure the schema is valid 
router.post("/signup", async (req,res)=>{
  const body = req.body();
  const {success} = signUpSchema.safeParse(req.body);
  if (!success){
    return res.json({
        msg: "wrong inputs / Email already taken"
    })
  }

  // check weather the user exist or not 
  const user  = User.findOne({
       username :  body.username 
 })

 if(user._id){
    return res.json({
        msg: "wrong inputs / Email already taken"
    })
 }

 const dbUser = await User.create (body);
 const token = jwt.sign({
  userId : dbUser._id
 }, JWT_SECRET)
res.json({
  msg: "user created successfully",
  token: token 
})
 
});

const signInSchema = zod.objects({
  username: zod.string().email(),
  password: zod.string()
})

router.post("/signin", async(req,res)=>{
  const {success} = signInSchema.safeParse(req.body);
  if(!success){
      return res.json({
        msg:"input incorrect"
      })
  }
  
});

module.exports = router;


