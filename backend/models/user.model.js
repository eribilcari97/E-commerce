import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema  = mongoose.Schema({
    name:{
        type:String,
        required: [true,"Name is required"]
    },
    email:{
        type: String,
        required:[true,"Email is required"],
        unique: true,
        lowercase: true,
        trim:true
    },
    password:{
        type: String,
        required: [true, "Password is required"],
minlength:[6,"Password must be at least 6 characters"]

    },
    cartItems:[
       {
        quantity:{
            type:Number,
            default: 1
        }
       }
    ],
     role:{
            type:String,
            enum:["customer","admin"],
            default:"customer"

        }
   
   
},{
    timestamps:true
})
const User  = new mongoose.model("User",userSchema);

//before saving a user , hash the password
userSchema.pre("save", async function  (next) {
    
    if(!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrupt.hash(this.password,salt);
        next();
    } catch (error) {
        next(error);
        
    }
})

userSchema.methods.comparePassword = async function (password){
return bcrypt.compare(password,this.password);
}


export default User;