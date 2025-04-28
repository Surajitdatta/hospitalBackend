// id , usename, password 
const mongoose = require("mongoose")

const AdminSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Email is required !"],
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address"
            ]
        },
        password: {
            type: String,
            required: [true, "Password is required !"]
        }
    },
    {
        timestamps:true
    }
)

const Admin = mongoose.model("Admin", AdminSchema)
module.exports = Admin ; 