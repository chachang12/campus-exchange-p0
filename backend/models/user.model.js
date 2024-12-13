// filepath: /c:/Users/cadch/Documents/Current Projects/SeniorSem/learn-mern/backend/models/user.model.js
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    profilePicture: {
        type: String
    },
    review: {
        type: Number,
        default: 0
    },
    universityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University',
        required: false
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
    // Add other fields as necessary
});

// Static method to find or create a user based on Google profile
userSchema.statics.findOrCreate = async function (profile, email) {
    try {
        // Log the collection name
        console.log('Using collection:', this.collection.name);

        // Log the profile object to see what data is being returned
        console.log('Google profile:', JSON.stringify(profile, null, 2));

        // Check if Google ID is provided
        if (!profile.id) {
            throw new Error('Google ID is required');
        }

        // Extract first and last names from the profile
        const [firstName, lastName] = profile.displayName.split(' ');
        const profilePicture = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : '';

        // Find the user with the Google ID
        let user = await this.findOne({ googleId: profile.id });

        // If user does not exist, create a new user
        if (!user) {
            user = await this.create({
                googleId: profile.id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                profilePicture: profilePicture,
            });
        }

        return user;
    } catch (error) {
        console.error('Error in findOrCreate method:', error);
        throw error;
    }
};

const User = mongoose.model('User', userSchema);

export default User;