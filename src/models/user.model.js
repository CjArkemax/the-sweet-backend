import mongoose ,{Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase: true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase: true,
            trim:true
        },
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String, //cloudinary url
            required:true,
        },
        coverImage:{
            type:String //cloudinary url
        },
        watchHistory:[
            {
            type:Schema.Types.ObjectId,
            ref:"Video"
            },
        ],
        password:{
            type:String,
            required:[true,'password is required']
        },
        refreshToken:{
            type:String
        }
    },{timestamps:true} //by this created at and updated at will be available
)

userSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10)
    next()
})//Whenever you call .save() on a  document User It takes the current this.password.It replaces it with a hashed version using bcrypt.hash// yes: every time you save a user, the password will be hashed before being stored in MongoDB.


//so above is the encrypted password stored in database.but user will enter in normal number format . how will both pasword in db in encrypted format and password written by user is same or not for this a custom method is written for userSchema  //i.e we will create some methods and inject it (custom methods)

userSchema.methods.isPasswordCorrect = async function(password){

   return await bcrypt.compare(password ,this.password) //the return will be either true or false

} // bcrypt library is used for hashing the password similar way it is also used to check the password too

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
        _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}



export const User = mongoose.model("User",userSchema)