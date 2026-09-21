// user schema
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "node:crypto";

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please enter your name"],
        //'       john      '=>  'john'
        // trim() removes whitespace from both ends of a string and returns a new string, without modifying the original string.
            trim:true,
            maxlength:[50,"Name cannot exceed 50 characters"],
        },
        email:{
            type:String,
            required:[true,"Please enter your email"],
            unique:true,
            lowercase:true,
            trim:true,
           
            validate:[validator.isEmail,"Please enter a valid email"]
        },
        password:{
            type:String,
            required:[true,"Please enter your password"],
            minlength:[6,"Password must be at least 6 characters"],
            select:false
        },
        passwordConfirm:{
            type:String,
            required:[true,"Please confirm your password"],
            validate:{
                validator:function(el){
                    return el===this.password;
                },
                message:"Passwords do not match"
            }
        },
        phoneNumber:{
            type:String,
            required:[true,"Please enter your phone number"],
            unique:true,
            trim:true,
            validate:{
                validator:function(value){
                    return validator.isMobilePhone(value,"en-IN");
                },
                message:"Please enter a valid phone number !"

            }
        },
        role:{
            type:String,
            enum:["user","admin"],
            default:"user"
        },
        avatar:{
            public_id:{
                type:String,
            },
            url:{
                type:String,
            }
        },
        passwordChangedAt:{
            type:Date
        },
        passwordResetToken:{
            type:String,
            select:false,
            index:true

        },
        passwordResetExpires:{
            type:Date,
            select:false
        },

    },
    {timestamps:true}
)
// setting the toJSON option to transform the output when converting a document to JSON.
//  This is useful for removing sensitive information from the output, such as passwords and other fields that should not be exposed in API responses.
userSchema.set("toJSON", {
    transform: function(doc, ret) {
        delete ret.password;
        delete ret.passwordConfirm;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.__v;
        return ret;
    }
});
// password logic
// hashing the password before saving the user document to the database. This is done to ensure that the password is stored securely and cannot be easily accessed by unauthorized users.
userSchema.pre("save", async function(){
    if(!this.isModified("password"))
        return;
    
    this.password=await bcrypt.hash(this.password,12);
    this.passwordConfirm=undefined;
})
// login logic
// test123===dne94j2t4b344hnmb
userSchema.methods.correctPassword=async function(caditatePassword,userPassword){
    return await bcrypt.compare(caditatePassword,userPassword);
}
// 
userSchema.methods.changedPasswordAfter=function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp=parseInt(
            this.passwordChangedAt.getTime()/1000,10

        );
        return JWTTimestamp<changedTimestamp;
           
    }
    return false;
        
}
// forgot password logic
userSchema.methods.createPasswordResetToken=function(){
    const resetToken=crypto.randomBytes(32).toString("hex");
    this.passwordResetToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires=Date.now()+10*60*1000;
    return resetToken;

}
const User=mongoose.model("User",userSchema);
// in mongoose, the model is created by calling mongoose.model() and passing in the name of the model ("User") and the schema (userSchema). This creates a new model that can be used to interact with the "users" collection in the MongoDB database.
export { User };
    
