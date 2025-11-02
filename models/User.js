import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(  // Define the schema for User model
    {
        name:{   //Define the name field
            type: String,   // Set the type of name field to String
            required: [true,"Please enter your name"],   //the name field is required with a custom error message
            trim: true,     // trim whitespace from both ends of the string
            minlength:[3,"Name must be at least 3 characters long"],  // min length validation with custom error message
            validate :{
            validator: function(v){  //custom validation function
                return /^[A-Za-z]+$/.test(v); // regex to allow only alphabetic characters
            },
            message: "Name should only contain letters and spaces",
        },
    },
    email:  {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password:{
        type: String,
        required: [true,"Password is required"],
        minlength:[8,"Password must be at least 8 characters long"],
    },
},
{timestamps: true}
);

export default mongoose.model('User', userSchema);