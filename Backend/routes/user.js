import {express} from "express";
import {zod} from "zod";
import {User} from "../db";
import {JWT} from "jsonwebtoken";
const router =  express.Router();

const signUpSchema = zod.object({
    username:  zod.string().email(),
    password:  zod.string(),
    firstName: zod.string(),
    lastName:  zod.string()
})
router.post("/signup", async (req,res)=>{
  const body = req.body();
  const {success} = signUpSchema.safeParse(req.body);
  if (!success){
    return res.json({
        msg: "wrong inputs / Email already taken"
    })
  }

  const user  = User.findOne({
       username :  body.username 
 })

 if(user._id){
    return res.json({
        msg: "wrong inputs / Email already taken"
    })
 }



});



router.post("/signin", );








module.exports = router;


