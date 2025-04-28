const express = require("express")
const router = express.Router()
const Admin = require("../models/admin.model")

//post edit get 

//Post passsword
router.post("/", async(req, res)=>{
    try{
        const admin = await Admin.create(req.body)
        res.status(200).json({message: "Password updated successfully !"})
    } catch(error){
        res.status(500).json({message:error.message})
    }
})

//get password
router.get("/", async(req,res)=>{
    try{
        const admin = await Admin.find()
        res.status(200).json(admin)
    }catch(err){
        res.status(500).message({message: message.err})
    }
})

//edit password
router.put("/:id", async(req, res)=>{
    try{
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {new:true})
        if(!admin) return res.status(404).json({message: "Not Found"})
        res.status(200).json(admin)
    }catch(err){
        res.status(500).json({message: message.error})
    }
})
module.exports = router;