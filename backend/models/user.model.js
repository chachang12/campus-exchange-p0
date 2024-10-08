import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String
    }
});

// Static login method to login a user
userSchema.statics.login = async function (email, password) {
    // Log the collection name
    console.log('Using collection:', this.collection.name);

    // Check if email and password are provided
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    // Find the user with the email
    const user = await this.findOne({ email });

    // Check if user exists
    if (!user) {
        throw new Error('Email not found');
    }

    // Compare the password
    const match = await bcrypt.compare(password, user.password);

    // Check if password is correct
    if (!match) {
        throw new Error('Password is incorrect');
    }

    return user;
}

// Static register method to register a user
userSchema.statics.register = async function (email, password) {
    // Log the collection name
    console.log('Using collection:', this.collection.name);

    // Check if email and password are provided
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    // Check if email is valid
    if (!validator.isEmail(email)) {
        throw new Error('Email is invalid');
    }

    // Check if password is strong
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password is not strong enough');
    }

    // Check if email already exists
    const exists = await this.findOne({ email });
    if (exists) {
        throw new Error('Email alread in use.');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });

    return user;
}
const User = mongoose.model('User', userSchema);

export default User;