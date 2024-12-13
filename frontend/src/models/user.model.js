class User {
    constructor({ _id, email, googleId, firstName, lastName, profilePicture, review, universityId, favorites }) {
      this._id = _id;
      this.email = email;
      this.googleId = googleId;
      this.firstName = firstName;
      this.lastName = lastName;
      this.profilePicture = profilePicture;
      this.review = review;
      this.universityId = universityId;
      this.favorites = favorites;
    }
  }
  
export default User;