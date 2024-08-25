const mongoose = require('mongoose');

// Define the Address schema
const addressSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    name: String,
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },

    houseNo: String,
    landmark: String,
    city: String,
    state: String,
    pincode: String
});

// Create and export the Address model
const Address = mongoose.model('Address', addressSchema);

// Define the User schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    verification: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
   
    profile : {
        type:String,
        default :'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    },
    role: {
        type: String,
        enum: ['General', 'Admin'],
        default: 'General'
    }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = { User, Address };
