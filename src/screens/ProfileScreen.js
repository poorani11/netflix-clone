import React from 'react';
import { useSelector } from 'react-redux';
import Nav from '../app/Nav';
import "./ProfileScreen.css";
import { selectUser } from '../features/userSlice';
import { auth } from '../app/firebase';
import { signOut } from 'firebase/auth';
import PlanScreen from './PlanScreen';

const ProfileScreen = () => {
  const user = useSelector(selectUser);
  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img src="https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg" alt="" />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <h3>Plans</h3>
              <PlanScreen />
              <button className="profileScreen__signOut" onClick={() => signOut(auth)}>SignOut</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen
