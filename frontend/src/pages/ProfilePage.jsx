// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// const Profile = () => {
//     const { user } = useContext(AuthContext);

//     // if (!isAuthenticated) {
//     //     return <p>Please log in to view your profile.</p>;
//     // }

//     return (
//         <div>
//             {/* <h1>Welcome, {user.name}</h1> */}
//             <p>Email: {user.email}</p>
//         </div>
//     );
// };

// export default Profile;


import React from 'react';
import { useUser } from '../context/UserContext';

const Profile = () => {
  const { user } = useUser();

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {user.firstName}</h1>
      {/* <img src={user.profilePicture} alt="Profile" /> */}
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
